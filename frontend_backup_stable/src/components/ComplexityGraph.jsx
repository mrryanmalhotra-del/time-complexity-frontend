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
import { motion } from 'framer-motion';

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

export default function ComplexityGraph({
  nValue = 100,
  selectedComplexities = [],
  presetAlgorithms = [],
  darkMode = false
}) {
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);

  const factorial = (n) => {
    if (n <= 1) return 1;
    if (n > 12) return Infinity; // Prevent overflow
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const generateDataPoints = (algorithm, maxN) => {
    const points = [];
    const step = Math.max(1, Math.floor(maxN / 100));

    for (let n = 1; n <= maxN; n += step) {
      try {
        const value = algorithm.calculate(n);
        if (isFinite(value) && value >= 0) points.push({ x: n, y: value });
      } catch (error) {
        console.error(`Error calculating ${algorithm.name}:`, error);
      }
    }
    return points;
  };

  const chartData = useMemo(() => {
    const datasets = presetAlgorithms
      .filter((algo) => selectedComplexities.includes(algo.id))
      .map((algorithm) => {
        const dataPoints = generateDataPoints(algorithm, nValue);
        const isHovered = hoveredAlgorithm === algorithm.id;

        return {
          label: algorithm.name,
          data: dataPoints,
          borderColor: algorithm.color,
          backgroundColor: algorithm.color + '20',
          borderWidth: isHovered ? 4 : 2,
          pointRadius: 0,
          pointHoverRadius: 6,
          tension: 0.2,
          fill: false,
          opacity:
            hoveredAlgorithm && hoveredAlgorithm !== algorithm.id ? 0.3 : 1,
          borderDash:
            hoveredAlgorithm && hoveredAlgorithm !== algorithm.id ? [5, 5] : []
        };
      });

    return { datasets };
  }, [nValue, selectedComplexities, presetAlgorithms, hoveredAlgorithm]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeInOutCubic'
      },
      interaction: { mode: 'nearest', intersect: false, axis: 'x' },
      onHover: (event, activeElements) => {
        if (activeElements.length > 0) {
          const datasetIndex = activeElements[0].datasetIndex;
          const hoveredAlgo = presetAlgorithms[datasetIndex];
          if (hoveredAlgo) setHoveredAlgorithm(hoveredAlgo.id);
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
            font: { size: 12, weight: 'bold' },
            color: darkMode ? '#e5e7eb' : '#374151',
            onHover: (event, legendItem) => {
              const algo = presetAlgorithms[legendItem.datasetIndex];
              if (algo) setHoveredAlgorithm(algo.id);
            },
            onLeave: () => setHoveredAlgorithm(null)
          }
        },
        tooltip: {
          backgroundColor: darkMode
            ? 'rgba(31, 41, 55, 0.95)'
            : 'rgba(0, 0, 0, 0.9)',
          padding: 12,
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 13 },
          titleColor: darkMode ? '#f3f4f6' : '#ffffff',
          bodyColor: darkMode ? '#e5e7eb' : '#ffffff',
          borderColor: darkMode ? '#4b5563' : 'transparent',
          borderWidth: darkMode ? 1 : 0,
          callbacks: {
            label: function (context) {
              const algo = presetAlgorithms[context.datasetIndex];
              let label = algo ? algo.name + ': ' : '';
              const value = context.parsed.y;
              if (value > 1e12) label += (value / 1e12).toFixed(2) + 'T';
              else if (value > 1e9) label += (value / 1e9).toFixed(2) + 'B';
              else if (value > 1e6) label += (value / 1e6).toFixed(2) + 'M';
              else if (value > 1e3) label += (value / 1e3).toFixed(2) + 'K';
              else label += value.toFixed(2);
              return label;
            },
            title: (context) => `Input size (n) = ${context[0].parsed.x}`,
            afterLabel: (context) => {
              const algo = presetAlgorithms[context.datasetIndex];
              return algo?.complexity
                ? `Complexity: ${algo.complexity}`
                : null;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Input Size (n)',
            color: darkMode ? '#9ca3af' : '#6b7280',
            font: { weight: 'bold', size: 12 }
          },
          ticks: { color: darkMode ? '#9ca3af' : '#6b7280' },
          grid: {
            color: darkMode
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.05)'
          }
        },
        y: {
          type: 'logarithmic',
          title: {
            display: true,
            text: 'Operations (log scale)',
            color: darkMode ? '#9ca3af' : '#6b7280',
            font: { weight: 'bold', size: 12 }
          },
          ticks: { color: darkMode ? '#9ca3af' : '#6b7280' },
          grid: {
            color: darkMode
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(0,0,0,0.05)'
          }
        }
      }
    }),
    [darkMode, presetAlgorithms, hoveredAlgorithm]
  );

  if (
    !nValue ||
    !Array.isArray(selectedComplexities) ||
    !Array.isArray(presetAlgorithms)
  ) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center ${
          darkMode ? 'bg-gray-900 text-gray-400' : 'bg-white text-gray-600'
        }`}
      >
        <p>Loading graph data...</p>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative h-full w-full rounded-xl overflow-hidden transition-all duration-300 ${
        darkMode ? 'bg-gray-900/50' : 'bg-white/90'
      } shadow-xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 p-6">
        {chartData?.datasets?.length > 0 ? (
          <Line data={chartData} options={options} redraw />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>No data to display. Select algorithms to visualize.</p>
          </div>
        )}
      </div>

      {selectedComplexities.length > 0 && (
        <div className="absolute bottom-4 right-4 flex flex-wrap gap-2 justify-end max-w-xs">
          {presetAlgorithms
            .filter(
              (algo) =>
                algo && algo.id && selectedComplexities.includes(algo.id)
            )
            .map((algo) => (
              <motion.div
                key={algo.id}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm ${
                  hoveredAlgorithm === algo.id
                    ? 'scale-105'
                    : 'opacity-80 hover:opacity-100'
                } transition-all duration-200`}
                style={{
                  backgroundColor: `${algo.color || '#6b7280'}20`,
                  color: algo.color || '#6b7280',
                  border: `1px solid ${algo.color || '#6b7280'}40`
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
                  <span className="ml-1 opacity-70">
                    ({algo.complexity})
                  </span>
                )}
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
}
