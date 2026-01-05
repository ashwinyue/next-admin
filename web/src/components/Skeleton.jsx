import { motion } from 'framer-motion'

const shimmerVariants = {
  initial: { backgroundPosition: '-1000px 0' },
  animate: {
    backgroundPosition: ['1000px 0', '-1000px 0'],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        duration: 2,
        ease: 'linear',
      },
    },
  },
}

// Base Skeleton
export function Skeleton({ className, width, height, variant = 'default' }) {
  const variants = {
    default: 'bg-void-border',
    light: 'bg-void-light',
    neon: 'bg-neon-cyan/20',
  }

  return (
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      className={`${variants[variant]} rounded-sm overflow-hidden relative`}
      style={{ width, height }}
      {...(className && { className })}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        style={{
          backgroundSize: '1000px 100%',
        }}
      />
    </motion.div>
  )
}

// Card Skeleton
export function CardSkeleton({ showAvatar = false }) {
  return (
    <div className="bg-surface border border-void-border p-6 space-y-4">
      {showAvatar && (
        <div className="flex items-center gap-4">
          <Skeleton width="48px" height="48px" className="rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton width="60%" height="16px" />
            <Skeleton width="40%" height="12px" />
          </div>
        </div>
      )}
      <div className="space-y-2">
        <Skeleton width="100%" height="16px" />
        <Skeleton width="80%" height="16px" />
        <Skeleton width="90%" height="16px" />
      </div>
    </div>
  )
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }) {
  return (
    <tr className="border-b border-void-border/50">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-4">
          <Skeleton
            width={i === 0 ? '80px' : `${Math.random() * 40 + 60}%`}
            height="16px"
          />
        </td>
      ))}
    </tr>
  )
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="bg-surface border border-void-border overflow-hidden">
      {/* Header */}
      <thead className="border-b border-void-border">
        <tr>
          {Array.from({ length: columns }).map((_, i) => (
            <th key={i} className="px-4 py-3 text-left">
              <Skeleton width="100px" height="12px" />
            </th>
          ))}
        </tr>
      </thead>
      {/* Body */}
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns} />
        ))}
      </tbody>
    </div>
  )
}

// Stat Card Skeleton
export function StatCardSkeleton() {
  return (
    <div className="bg-surface border border-void-border p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton width="48px" height="48px" />
        <Skeleton width="60px" height="20px" />
      </div>
      <div className="space-y-2">
        <Skeleton width="100px" height="12px" />
        <Skeleton width="120px" height="28px" />
      </div>
    </div>
  )
}

// Dashboard Skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton width="200px" height="32px" />
          <Skeleton width="300px" height="16px" className="mt-2" />
        </div>
        <Skeleton width="120px" height="40px" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-void-border p-6">
          <Skeleton width="150px" height="20px" />
          <div className="h-48 mt-6 flex items-end justify-between gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="flex-1" height={`${Math.random() * 60 + 20}%`} />
            ))}
          </div>
        </div>

        <div className="bg-surface border border-void-border p-6">
          <Skeleton width="120px" height="20px" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width="32px" height="32px" className="rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton width="70%" height="14px" />
                  <Skeleton width="40%" height="10px" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// List Item Skeleton
export function ListItemSkeleton({ showAvatar = true }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-void-border">
      {showAvatar && <Skeleton width="40px" height="40px" className="rounded-full" />}
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" height="16px" />
        <Skeleton width="40%" height="12px" />
      </div>
      <Skeleton width="80px" height="24px" />
    </div>
  )
}

// Input Skeleton
export function InputSkeleton({ label = true }) {
  return (
    <div className="space-y-2">
      {label && <Skeleton width="100px" height="12px" />}
      <Skeleton width="100%" height="44px" />
    </div>
  )
}

// Text Block Skeleton
export function TextBlockSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '70%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  )
}

// Issue List Skeleton
export function IssueListSkeleton({ count = 8 }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton width="200px" height="32px" />
          <Skeleton width="300px" height="16px" className="mt-2" />
        </div>
        <div className="flex gap-3">
          <Skeleton width="100px" height="40px" />
          <Skeleton width="120px" height="40px" />
        </div>
      </div>

      {/* Search */}
      <Skeleton width="400px" height="44px" />

      {/* Table */}
      <div className="bg-surface border border-void-border overflow-hidden">
        <TableSkeleton rows={count} columns={6} />
      </div>
    </div>
  )
}

// Document Grid Skeleton
export function DocumentGridSkeleton({ count = 8 }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton width="150px" height="32px" />
          <Skeleton width="250px" height="16px" className="mt-2" />
        </div>
        <Skeleton width="120px" height="40px" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-surface border border-void-border p-6">
            <div className="flex items-start gap-4">
              <Skeleton width="48px" height="48px" />
              <div className="flex-1 space-y-2">
                <Skeleton width="80%" height="16px" />
                <Skeleton width="50%" height="12px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
