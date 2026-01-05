import { motion } from 'framer-motion'

const statusConfig = {
  online: { color: 'bg-neon-green', shadow: 'shadow-[0_0_8px_currentColor]', label: '在线' },
  offline: { color: 'bg-gray-600', shadow: '', label: '离线' },
  busy: { color: 'bg-neon-amber', shadow: 'shadow-[0_0_8px_currentColor]', label: '忙碌' },
  error: { color: 'bg-neon-pink', shadow: 'shadow-[0_0_8px_currentColor]', label: '错误' },
}

export default function StatusIndicator({
  status = 'online',
  showLabel = false,
  size = 'md',
  pulse = true,
}) {
  const config = statusConfig[status] || statusConfig.offline
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  }

  return (
    <div className="flex items-center gap-2">
      <motion.span
        className={`${sizes[size]} ${config.color} ${config.shadow} rounded-full ${pulse ? 'animate-pulse' : ''}`}
      />
      {showLabel && (
        <span className="text-xs font-mono text-gray-500">{config.label}</span>
      )}
    </div>
  )
}
