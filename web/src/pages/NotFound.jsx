import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        {/* 404 */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-[120px] font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-neon-cyan to-neon-cyan/20 leading-none"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="text-2xl font-display text-white mb-2">页面未找到</h2>
          <p className="text-gray-600 font-mono text-sm mb-8">PAGE_NOT_FOUND // CHECK_URL_AND_RETRY</p>
        </motion.div>

        {/* Decorative Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-64 h-64 mx-auto mb-8 grid-bg opacity-30 rounded-full"
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <Link to="/dashboard" className="btn-primary flex items-center gap-2">
            <Home className="w-4 h-4" />
            返回首页
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回上一页
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
