import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

// Animated Line Chart
export function LineChart({ data = [], height = 200, color = 'neon-cyan' }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
  }, [])

  const max = Math.max(...data)
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - (value / max) * 100
    return `${x},${y}`
  }).join(' ')

  // Area under the curve
  const areaPoints = `0,100 ${points} 100,100`

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="border-t border-void-border/50 w-full" />
        ))}
      </div>

      {/* Area */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`var(--color-${color})`} stopOpacity="0.3" />
            <stop offset="100%" stopColor={`var(--color-${color})`} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={areaPoints}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </svg>

      {/* Line */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <motion.polyline
          points={points}
          fill="none"
          stroke={`var(--color-${color})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ strokeDasharray: '1 0', vectorEffect: 'non-scaling-stroke' }}
        />
      </svg>

      {/* Data Points */}
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100
        const y = 100 - (value / max) * 100
        return (
          <motion.div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-void border-2 border-neon-cyan"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            whileHover={{ scale: 1.5 }}
          />
        )
      })}
    </div>
  )
}

// Donut Chart
export function DonutChart({ data = [], size = 160, strokeWidth = 20 }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const getColor = (index) => {
    const colors = ['neon-cyan', 'neon-pink', 'neon-amber', 'neon-green', 'purple-500']
    return colors[index % colors.length]
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = item.value / total
          const angle = percentage * 360
          const radius = (size - strokeWidth) / 2
          const center = size / 2
          const circumference = 2 * Math.PI * radius
          const dashArray = (angle / 360) * circumference

          const startX = center + radius * Math.cos((currentAngle * Math.PI) / 180)
          const startY = center + radius * Math.sin((currentAngle * Math.PI) / 180)
          const endX = center + radius * Math.cos(((currentAngle + angle) * Math.PI) / 180)
          const endY = center + radius * Math.sin(((currentAngle + angle) * Math.PI) / 180)
          const largeArc = angle > 180 ? 1 : 0

          const pathData = angle === 360
            ? `M ${center - radius} ${center} A ${radius} ${radius} 0 1 1 ${center + radius} ${center} A ${radius} ${radius} 0 1 1 ${center - radius} ${center}`
            : `M ${center} ${center} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY} Z`

          currentAngle += angle

          return (
            <motion.path
              key={item.label}
              d={pathData}
              fill={`var(--color-${getColor(index)})`}
              fillOpacity={0.8}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              style={{ transformOrigin: 'center' }}
              whileHover={{ fillOpacity: 1 }}
            />
          )
        })}
        {/* Center hole */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth * 2) / 2}
          fill="var(--color-surface)"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-display text-white">{total}</p>
          <p className="text-xs text-gray-600 font-mono">TOTAL</p>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute -bottom-16 left-0 right-0 flex flex-wrap justify-center gap-3">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: `var(--color-${getColor(index)})` }}
            />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Progress Ring
export function ProgressRing({ value = 0, max = 100, size = 80, strokeWidth = 6, color = 'neon-cyan', label }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value / max, 1)
  const offset = circumference - progress * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-void-border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`var(--color-${color})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-xl font-display text-white">{Math.round(progress * 100)}%</span>
        {label && <span className="text-xs text-gray-600 font-mono mt-1">{label}</span>}
      </div>
    </div>
  )
}

// Activity Heatmap
export function ActivityHeatmap({ data = [], weeks = 12 }) {
  const days = ['日', '一', '二', '三', '四', '五', '六']

  const getColor = (value) => {
    if (value === 0) return 'bg-void-border'
    if (value < 3) return 'bg-neon-cyan/20'
    if (value < 6) return 'bg-neon-cyan/40'
    if (value < 10) return 'bg-neon-cyan/60'
    return 'bg-neon-cyan'
  }

  return (
    <div className="bg-surface border border-void-border p-6">
      <h3 className="font-display text-sm tracking-wider text-gray-400 mb-4">活动热度</h3>
      <div className="flex gap-1">
        {/* Day Labels */}
        <div className="flex flex-col gap-1 text-xs text-gray-600 font-mono mr-2">
          {days.map((day, i) => (
            <span key={day} className="h-3 flex items-center" style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}>
              {day}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-1">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const index = weekIndex * 7 + dayIndex
                const value = data[index] || Math.floor(Math.random() * 15)
                return (
                  <motion.div
                    key={dayIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.01 }}
                    className={`w-3 h-3 rounded-sm ${getColor(value)} hover:ring-1 hover:ring-neon-cyan transition-all cursor-pointer`}
                    title={`${value} 次提交`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-600 font-mono">
        <span>少</span>
        <div className="w-3 h-3 rounded-sm bg-void-border" />
        <div className="w-3 h-3 rounded-sm bg-neon-cyan/20" />
        <div className="w-3 h-3 rounded-sm bg-neon-cyan/40" />
        <div className="w-3 h-3 rounded-sm bg-neon-cyan/60" />
        <div className="w-3 h-3 rounded-sm bg-neon-cyan" />
        <span>多</span>
      </div>
    </div>
  )
}

// Metric Card with Trend
export function MetricCard({ label, value, change, trend, icon: Icon, color = 'neon-cyan', delay = 0 }) {
  const isPositive = trend === 'up'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative group card-hover bg-surface border border-void-border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}/10 border border-${color}/30 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}`} style={{ color: `var(--color-${color})` }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-mono ${isPositive ? 'text-neon-green' : 'text-neon-pink'}`}>
          <span className={isPositive ? 'rotate-0' : 'rotate-180 inline-block'}>
            ▲
          </span>
          {change}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-gray-500 text-xs font-display tracking-wider uppercase">{label}</p>
        <p className="text-3xl font-display text-white data-font">{value}</p>
      </div>

      {/* Mini Sparkline */}
      <div className="absolute bottom-6 right-6 w-20 h-8 opacity-30">
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <polyline
            points="0,35 15,25 30,30 45,20 60,25 75,15 90,20 100,10"
            fill="none"
            stroke={`var(--color-${color})`}
            strokeWidth="2"
          />
        </svg>
      </div>
    </motion.div>
  )
}
