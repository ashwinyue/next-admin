import { motion } from 'framer-motion'

const variants = {
  default: 'bg-surface border border-void-border',
  elevated: 'bg-surface-elevated border border-void-border shadow-lg',
  neon: 'bg-surface border border-neon-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.1)]',
}

export default function Card({
  children,
  variant = 'default',
  hover = false,
  className = '',
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`${variants[variant]} ${hover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
