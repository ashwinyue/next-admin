import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'relative px-6 py-3 bg-neon-pink/10 border border-neon-pink/50 text-neon-pink font-display text-sm tracking-wider uppercase transition-all duration-300 hover:bg-neon-pink/20',
  ghost: 'relative px-6 py-3 bg-transparent border border-transparent text-gray-400 font-display text-sm tracking-wider uppercase transition-all duration-300 hover:bg-surface-elevated hover:text-white',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      disabled={disabled || loading}
      className={`${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </motion.button>
  )
}
