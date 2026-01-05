import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  Database,
  Settings,
  Activity,
  Shield,
  ChevronRight,
  Terminal,
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: '仪表盘' },
  { path: '/issues', icon: FileText, label: 'Issues' },
  { path: '/documents', icon: Database, label: '文档库' },
  { path: '/settings', icon: Settings, label: '系统设置' },
]

export default function MainLayout() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="min-h-screen bg-void flex">
      {/* Scanline Effect */}
      <div className="fixed inset-0 scanline-overlay z-50 pointer-events-none opacity-30" />
      <div className="fixed inset-0 bg-noise opacity-50 pointer-events-none z-40" />

      {/* Sidebar */}
      <aside className="w-72 bg-surface border-r border-void-border flex flex-col relative z-30">
        {/* Logo */}
        <div className="p-6 border-b border-void-border">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent" />
              <Terminal className="w-6 h-6 text-neon-cyan relative z-10" />
            </div>
            <div>
              <h1 className="font-display text-lg tracking-wider text-white glitch" data-text="ISSUE2MD">
                ISSUE2MD
              </h1>
              <p className="text-xs text-gray-600 font-mono tracking-widest">CONTROL SYSTEM</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-sm
                  transition-all duration-300 group overflow-hidden
                  ${isActive
                    ? 'bg-neon-cyan/10 border-l-2 border-neon-cyan'
                    : 'hover:bg-surface-elevated border-l-2 border-transparent'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-neon-cyan/5"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-neon-cyan' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <span className={`relative z-10 font-display text-sm tracking-wider ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {isActive && <ChevronRight className="w-4 h-4 text-neon-cyan ml-auto relative z-10" />}
              </Link>
            )
          })}
        </nav>

        {/* Status Panel */}
        <div className="p-4 border-t border-void-border">
          <div className="bg-surface-elevated border border-void-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full status-online animate-pulse" />
              <span className="text-xs font-mono text-gray-500">SYSTEM ONLINE</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="text-gray-600">UPTIME</div>
              <div className="text-neon-cyan text-right">99.9%</div>
              <div className="text-gray-600">VERSION</div>
              <div className="text-gray-400 text-right">v0.1.0</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-30">
        {/* Top Bar */}
        <header className="h-16 bg-surface/80 backdrop-blur-sm border-b border-void-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-gray-600">
              <span className="text-neon-cyan">&gt;</span> {currentPath}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Activity Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-void-border rounded-sm">
              <Activity className="w-4 h-4 text-neon-green" />
              <span className="text-xs font-mono text-gray-400">LIVE</span>
            </div>

            {/* Shield Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neon-cyan/10 border border-neon-cyan/30 rounded-sm">
              <Shield className="w-4 h-4 text-neon-cyan" />
              <span className="text-xs font-mono text-neon-cyan">SECURE</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>

      {/* Ambient Glow Effects */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  )
}
