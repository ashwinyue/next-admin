import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react'

// Mock data
const stats = [
  {
    label: '总 Issues',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: FileText,
    color: 'neon-cyan',
  },
  {
    label: '已转换',
    value: '2,341',
    change: '+8.3%',
    trend: 'up',
    icon: CheckCircle,
    color: 'neon-green',
  },
  {
    label: '处理中',
    value: '428',
    change: '-2.1%',
    trend: 'down',
    icon: Clock,
    color: 'neon-amber',
  },
  {
    label: '异常',
    value: '78',
    change: '+5.7%',
    trend: 'up',
    icon: AlertTriangle,
    color: 'neon-pink',
  },
]

const recentActivity = [
  { id: 1, type: 'convert', issue: '#1842', status: 'success', time: '2 分钟前' },
  { id: 2, type: 'sync', issue: '#1841', status: 'processing', time: '5 分钟前' },
  { id: 3, type: 'convert', issue: '#1840', status: 'success', time: '8 分钟前' },
  { id: 4, type: 'error', issue: '#1839', status: 'failed', time: '12 分钟前' },
  { id: 5, type: 'convert', issue: '#1838', status: 'success', time: '15 分钟前' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
}

function StatCard({ stat }) {
  const Icon = stat.icon
  const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <motion.div
      variants={itemVariants}
      className="relative group card-hover"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ from: `var(--color-${stat.color}/10)`, to: 'transparent' }}
      />
      <div className="relative bg-surface border border-void-border p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-${stat.color}/10 border border-${stat.color}/30 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 text-${stat.color}`} style={{ color: `var(--color-${stat.color})` }} />
          </div>
          <div className={`flex items-center gap-1 text-xs font-mono ${stat.trend === 'up' ? 'text-neon-green' : 'text-neon-pink'}`}>
            <TrendIcon className="w-3 h-3" />
            {stat.change}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-xs font-display tracking-wider uppercase">{stat.label}</p>
          <p className="text-3xl font-display text-white data-font">{stat.value}</p>
        </div>
      </div>
    </motion.div>
  )
}

function ActivityItem({ activity }) {
  const statusConfig = {
    success: { icon: CheckCircle, color: 'text-neon-green', bg: 'bg-neon-green/10' },
    processing: { icon: Clock, color: 'text-neon-amber', bg: 'bg-neon-amber/10' },
    failed: { icon: AlertTriangle, color: 'text-neon-pink', bg: 'bg-neon-pink/10' },
  }

  const typeLabels = {
    convert: '转换文档',
    sync: '同步数据',
    error: '错误报告',
  }

  const config = statusConfig[activity.status]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4 p-3 bg-surface border border-void-border hover:border-void-border/50 transition-colors"
    >
      <div className={`w-8 h-8 ${config.bg} border border-${config.color.split('-')[1]}-500/30 flex items-center justify-center`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">
          <span className="text-neon-cyan font-mono">{activity.issue}</span>
          <span className="text-gray-600 mx-2">/</span>
          {typeLabels[activity.type]}
        </p>
        <p className="text-xs text-gray-600 font-mono">{activity.time}</p>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-display tracking-wider text-white mb-1">仪表盘</h1>
          <p className="text-gray-600 font-mono text-xs">DASHBOARD // SYSTEM_OVERVIEW</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-xs font-mono text-gray-500">实时更新</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-surface border border-void-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-sm tracking-wider text-gray-400">转换趋势</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-mono bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">24H</button>
              <button className="px-3 py-1 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors">7D</button>
              <button className="px-3 py-1 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors">30D</button>
            </div>
          </div>

          {/* Simple Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 px-4">
            {[65, 45, 78, 52, 88, 70, 95, 60, 75, 82, 68, 90].map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-neon-cyan/20 to-neon-cyan/5 border-t border-neon-cyan/50 relative group"
              >
                <div className="absolute bottom-0 left-0 right-0 h-full bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between mt-4 px-4">
            {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((label) => (
              <span key={label} className="text-xs font-mono text-gray-600">{label}</span>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-void-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-sm tracking-wider text-gray-400">最近活动</h2>
            <Activity className="w-4 h-4 text-neon-cyan" />
          </div>

          <div className="space-y-2">
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-xs font-mono text-gray-500 hover:text-neon-cyan transition-colors">
            查看全部
          </button>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface border border-void-border p-6"
      >
        <h2 className="font-display text-sm tracking-wider text-gray-400 mb-4">系统状态</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'CPU 使用率', value: '23%', color: 'neon-cyan' },
            { label: '内存使用', value: '1.2GB / 4GB', color: 'neon-green' },
            { label: '磁盘空间', value: '45.2GB / 100GB', color: 'neon-amber' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">{item.label}</span>
                <span className={`text-${item.color} font-mono`}>{item.value}</span>
              </div>
              <div className="h-1 bg-void-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: item.label === 'CPU 使用率' ? '23%' : item.label === '内存使用' ? '30%' : '45%' }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className={`h-full bg-${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
