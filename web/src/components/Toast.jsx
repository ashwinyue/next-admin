import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

// Toast Context
const ToastContext = createContext(null)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

// Toast Provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((config) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast = {
      id,
      type: config.type || 'info',
      title: config.title,
      message: config.message,
      duration: config.duration ?? (config.type === 'error' ? 5000 : 3000),
      ...config,
    }
    setToasts((prev) => [...prev, toast])

    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const success = useCallback((title, message, options = {}) => {
    return addToast({ type: 'success', title, message, ...options })
  }, [addToast])

  const error = useCallback((title, message, options = {}) => {
    return addToast({ type: 'error', title, message, ...options })
  }, [addToast])

  const warning = useCallback((title, message, options = {}) => {
    return addToast({ type: 'warning', title, message, ...options })
  }, [addToast])

  const info = useCallback((title, message, options = {}) => {
    return addToast({ type: 'info', title, message, ...options })
  }, [addToast])

  const dismiss = useCallback((id) => {
    removeToast(id)
  }, [removeToast])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, success, error, warning, info, dismiss, dismissAll }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Individual Toast
function Toast({ toast, onRemove }) {
  const config = {
    success: {
      icon: CheckCircle,
      color: 'text-neon-green',
      bg: 'bg-neon-green/10',
      border: 'border-neon-green/30',
      glow: 'shadow-[0_0_20px_rgba(0,255,159,0.2)]',
    },
    error: {
      icon: XCircle,
      color: 'text-neon-pink',
      bg: 'bg-neon-pink/10',
      border: 'border-neon-pink/30',
      glow: 'shadow-[0_0_20px_rgba(255,0,110,0.2)]',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-neon-amber',
      bg: 'bg-neon-amber/10',
      border: 'border-neon-amber/30',
      glow: 'shadow-[0_0_20px_rgba(255,170,0,0.2)]',
    },
    info: {
      icon: Info,
      color: 'text-neon-cyan',
      bg: 'bg-neon-cyan/10',
      border: 'border-neon-cyan/30',
      glow: 'shadow-[0_0_20px_rgba(0,245,255,0.2)]',
    },
  }[toast.type] || config.info

  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`pointer-events-auto min-w-[360px] max-w-[420px] bg-surface border ${config.border} ${config.glow} backdrop-blur-sm rounded-sm overflow-hidden`}
      layout
    >
      {/* Progress Bar */}
      {toast.duration > 0 && (
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          className={`h-0.5 ${config.bg}`}
        />
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`w-10 h-10 ${config.bg} ${config.border} border flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className="text-white font-display text-sm tracking-wide mb-1">{toast.title}</h4>
            )}
            {toast.message && (
              <p className="text-gray-400 text-sm">{toast.message}</p>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onRemove}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-600 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        {toast.actions && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-void-border">
            {toast.actions.map((action, index) => (
              <button
                key={index}
                onClick={() => {
                  action.onClick?.()
                  if (action.dismissOnClick !== false) {
                    onRemove()
                  }
                }}
                className={`px-3 py-1.5 text-xs font-display uppercase tracking-wider border transition-colors ${
                  action.primary
                    ? `bg-${config.color.split('-')[1]}-500/10 ${config.color} ${config.border}`
                    : 'text-gray-400 border-void-border hover:text-white hover:border-gray-600'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Hook for imperative toasts
export function toast() {
  const { success, error, warning, info } = useToast()
  return { success, error, warning, info }
}
