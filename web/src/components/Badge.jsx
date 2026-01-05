import { motion } from 'framer-motion'

const variants = {
  default: 'bg-void-border text-gray-400',
  success: 'bg-neon-green/10 text-neon-green border border-neon-green/30',
  warning: 'bg-neon-amber/10 text-neon-amber border border-neon-amber/30',
  danger: 'bg-neon-pink/10 text-neon-pink border border-neon-pink/30',
  info: 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  pulse = false,
  className = '',
}) {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-2 rounded-sm font-mono ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${pulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </motion.span>
  )
}
