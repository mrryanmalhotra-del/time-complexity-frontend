import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
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

function ComplexityGraph({ 
  nValue = 100, 
  selectedComplexities = [], 
  presetAlgorithms = [], 
  darkMode = false 
}) {
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);
  
  // Helper function to calculate factorial
  const factorial = (n) => {
    if (n <= 1) return 1;
    if (n > 12) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  // Generate data points from algorithm's calculation function
  const generateDataPoints = (algorithm, maxN) => {
    const points = [];
    const step = Math.max(1, Math.floor(maxN / 100));
    
    for (let n = 1; n <= maxN; n += step) {
      try {
        const value = algorithm.calculate(n);
        if (isFinite(value) && value >= 0) {
          points.push({ x: n, y: value });
        }
      } catch (error) {
        console.error(`Error calculating ${algorithm.name}:`, error);
      }
    }
    
    return points;
  };

  const chartData = useMemo(() => {
    const datasets = presetAlgorithms
      .filter(algo => selectedComplexities.includes(algo.id))
      .map(algorithm => {
        const dataPoints = generateDataPoints(algorithm, nValue);
        const isHovered = hoveredAlgorithm === algorithm.id;
        
        return {
          label: algorithm.name,
          data: dataPoints,
          borderColor: algorithm.color || '#6366f1',
          backgroundColor: algorithm.color ? `${algorithm.color}40` : 'rgba(99, 102, 241, 0.2)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
          tension: 0.2,
          fill: false,
          opacity: hoveredAlgorithm && hoveredAlgorithm !== algorithm.id ? 0.3 : 1,
          borderDash: hoveredAlgorithm && hoveredAlgorithm !== algorithm.id ? [5, 5] : []
        };
      });

    return { datasets };
  }, [nValue, selectedComplexities, presetAlgorithms, hoveredAlgorithm]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeInOutCubic'
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
    onHover: (event, activeElements) => {
      if (activeElements.length > 0) {
        const datasetIndex = activeElements[0].datasetIndex;
        const hoveredAlgo = presetAlgorithms[datasetIndex];
        if (hoveredAlgo) {
          setHoveredAlgorithm(hoveredAlgo.id);
        }
      } else {
        setHoveredAlgorithm(null);
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold'
          },
          color: darkMode ? '#e5e7eb' : '#374151',
          onHover: (event, legendItem, legend) => {
            const algo = presetAlgorithms[legendItem.datasetIndex];
            if (algo) {
              setHoveredAlgorithm(algo.id);
            }
          },
          onLeave: () => {
            setHoveredAlgorithm(null);
          }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        titleColor: darkMode ? '#f3f4f6' : '#ffffff',
        bodyColor: darkMode ? '#e5e7eb' : '#ffffff',
        borderColor: darkMode ? '#4b5563' : 'transparent',
        borderWidth: darkMode ? 1 : 0,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        callbacks: {
          label: function(context) {
            const algo = presetAlgorithms[context.datasetIndex];
            let label = algo ? algo.name : context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            const value = context.parsed.y;
            if (value > 1e12) {
              label += (value / 1e12).toFixed(2) + 'T';
            } else if (value > 1e9) {
              label += (value / 1e9).toFixed(2) + 'B';
            } else if (value > 1e6) {
              label += (value / 1e6).toFixed(2) + 'M';
            } else if (value > 1e3) {
              label += (value / 1e3).toFixed(2) + 'K';
            } else {
              label += value.toFixed(2);
            }
            return label;
          },
          title: function(context) {
            return `Input size (n) = ${context[0].parsed.x}`;
          },
          afterLabel: function(context) {
            const algo = presetAlgorithms[context.datasetIndex];
            if (algo && algo.complexity) {
              return `Complexity: ${algo.complexity}`;
            }
            return null;
          }
        }
      },
      annotation: {
        annotations: []
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Input Size (n)',
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            weight: 'bold',
            size: 12
          },
          padding: { top: 10 }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          tickColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          tickLength: 5,
          tickWidth: 1
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 11
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
          padding: 8
        }
      },
      y: {
        type: 'logarithmic',
        title: {
          display: true,
          text: 'Operations (log scale)',
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            weight: 'bold',
            size: 12
          },
          padding: { bottom: 10 }
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
          tickColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          tickLength: 5,
          tickWidth: 1
        },
        ticks: {
          color: darkMode ? '#9ca3af' : '#6b7280',
          font: {
            size: 11
          },
          padding: 8,
          callback: function(value) {
            if (value === 0) return '0';
            const sign = value < 0 ? '-' : '';
            value = Math.abs(value);
            if (value >= 1e12) return sign + (value / 1e12).toFixed(1) + 'T';
            if (value >= 1e9) return sign + (value / 1e9).toFixed(1) + 'B';
            if (value >= 1e6) return sign + (value / 1e6).toFixed(1) + 'M';
            if (value >= 1e3) return sign + (value / 1e3).toFixed(1) + 'K';
            if (value >= 1) return sign + value.toFixed(0);
            if (value >= 0.1) return sign + value.toFixed(1);
            if (value >= 0.01) return sign + value.toFixed(2);
            return sign + value.toExponential(1);
          }
        },
        min: 1
      }
    },
    elements: {
      line: {
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        tension: 0.3
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 10,
        hoverBorderWidth: 2,
        hoverBorderColor: function(context) {
          return context.dataset.borderColor;
        },
        hoverBackgroundColor: function(context) {
          return context.dataset.borderColor;
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    },
    transition: {
      duration: 500,
      easing: 'easeInOutQuad'
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      animationDuration: 200
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      position: 'nearest',
      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(0, 0, 0, 0.9)',
      titleFontSize: 14,
      titleFontColor: '#fff',
      titleMarginBottom: 6,
      bodyFontColor: '#fff',
      bodyFontSize: 13,
      bodySpacing: 4,
      padding: 12,
      borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      caretSize: 6,
      displayColors: false,
      caretPadding: 8,
      cornerRadius: 8,
      xPadding: 12,
      yPadding: 12,
      callbacks: {
        label: function(tooltipItem, data) {
          const algo = presetAlgorithms[tooltipItem.datasetIndex];
          let label = algo ? algo.name : data.datasets[tooltipItem.datasetIndex].label || '';
          if (label) {
            label += ': ';
          }
          const value = tooltipItem.yLabel;
          if (value > 1e12) {
            label += (value / 1e12).toFixed(2) + 'T';
          } else if (value > 1e9) {
            label += (value / 1e9).toFixed(2) + 'B';
          } else if (value > 1e6) {
            label += (value / 1e6).toFixed(2) + 'M';
          } else if (value > 1e3) {
            label += (value / 1e3).toFixed(2) + 'K';
          } else {
            label += value.toFixed(2);
          }
          return label;
        }
      }
    }
  }), [darkMode, presetAlgorithms, hoveredAlgorithm]);

  // Safety check for required props
  if (!nValue || !Array.isArray(selectedComplexities) || !Array.isArray(presetAlgorithms)) {
    return (
      <div className={`h-full w-full flex items-center justify-center ${
        darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'
      }`}>
        <p>Loading graph data...</p>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full rounded-xl overflow-hidden transition-all duration-300 ${
      darkMode ? 'bg-gray-900/50' : 'bg-white/90'
    } shadow-xl`}>
      <div className="absolute inset-0 p-6">
        {chartData?.datasets?.length > 0 ? (
          <Line 
            data={chartData} 
            options={options} 
            redraw={true}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No data to display. Select algorithms to visualize.</p>
          </div>
        )}
      </div>
      
      {selectedComplexities.length > 0 && (
        <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end max-w-xs">
          {presetAlgorithms
            .filter(algo => algo && algo.id && selectedComplexities.includes(algo.id))
            .map(algo => (
              <div
                key={algo.id}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm transition-all duration-200 ${
                  hoveredAlgorithm === algo.id ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: `${algo.color || '#6b7280'}20`,
                  color: algo.color || '#6b7280',
                  border: `1px solid ${algo.color || '#6b7280'}40`,
                  transform: hoveredAlgorithm === algo.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredAlgorithm(algo.id)}
                onMouseLeave={() => setHoveredAlgorithm(null)}
              >
                <span 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: algo.color || '#6b7280' }}
                />
                {algo.name || 'Algorithm'} 
                {algo.complexity && (
                  <span className="ml-1 opacity-70">({algo.complexity})</span>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default ComplexityGraph;
