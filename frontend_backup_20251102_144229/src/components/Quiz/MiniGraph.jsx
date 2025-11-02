/**
 * MiniGraph Component
 * Renders a small complexity curve for quiz options
 */

import { useEffect, useRef, useState } from 'react'

export default function MiniGraph({ data, color, complexity, darkMode }) {
  const canvasRef = useRef(null)
  const [isDrawn, setIsDrawn] = useState(false)
  
  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Get data bounds
    const maxN = Math.max(...data.map(d => d.n))
    const maxValue = Math.max(...data.map(d => d.value))
    
    // Scale functions
    const scaleX = (n) => (n / maxN) * (width - 40) + 20
    const scaleY = (value) => height - 20 - ((value / maxValue) * (height - 40))
    
    // Draw grid (subtle)
    ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)'
    ctx.lineWidth = 1
    
    for (let i = 0; i <= 4; i++) {
      const y = 20 + (i / 4) * (height - 40)
      ctx.beginPath()
      ctx.moveTo(20, y)
      ctx.lineTo(width - 20, y)
      ctx.stroke()
    }
    
    // Draw axes
    ctx.strokeStyle = darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
    ctx.lineWidth = 2
    
    // X-axis
    ctx.beginPath()
    ctx.moveTo(20, height - 20)
    ctx.lineTo(width - 20, height - 20)
    ctx.stroke()
    
    // Y-axis
    ctx.beginPath()
    ctx.moveTo(20, 20)
    ctx.lineTo(20, height - 20)
    ctx.stroke()
    
    // Animate curve drawing
    let progress = 0
    const animate = () => {
      if (progress >= 1) {
        setIsDrawn(true)
        return
      }
      
      progress += 0.02
      const currentProgress = Math.min(progress, 1)
      
      // Clear previous frame
      ctx.clearRect(21, 0, width - 41, height - 21)
      
      // Draw curve up to current progress
      const visiblePoints = Math.floor(data.length * currentProgress)
      
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      ctx.beginPath()
      for (let i = 0; i < visiblePoints; i++) {
        const point = data[i]
        const x = scaleX(point.n)
        const y = scaleY(point.value)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      
      // Continue animation
      requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
  }, [data, color, darkMode])
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="w-full"
      />
      
      {/* Complexity label */}
      <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-bold ${
        darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'
      }`} style={{ borderColor: color, borderWidth: '2px' }}>
        {complexity}
      </div>
      
      {/* Legend dot */}
      <div
        className="absolute top-2 right-2 w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}
