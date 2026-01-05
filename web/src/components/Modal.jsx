import { createContext, useContext, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Modal Context
const ModalContext = createContext(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}

// Modal Provider
export function ModalProvider({ children }) {
  const [modals, setModals] = useState([])

  const open = useCallback((config) => {
    const id = Math.random().toString(36).substr(2, 9)
    const modal = {
      id,
      component: config.component,
      title: config.title,
      size: config.size || 'md',
      closable: config.closable !== false,
      closeOnOverlay: config.closeOnOverlay !== false,
      closeOnEsc: config.closeOnEsc !== false,
      props: config.props || {},
      ...config,
    }
    setModals((prev) => [...prev, modal])
    return id
  }, [])

  const close = useCallback((id) => {
    setModals((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const closeAll = useCallback(() => {
    setModals([])
  }, [])

  return (
    <ModalContext.Provider value={{ open, close, closeAll }}>
      {children}
      <ModalContainer modals={modals} onClose={close} />
    </ModalContext.Provider>
  )
}

// Modal Container
function ModalContainer({ modals, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] pointer-events-none">
      <AnimatePresence mode="popLayout">
        {modals.map((modal) => (
          <ModalWrapper key={modal.id} modal={modal} onClose={() => onClose(modal.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Modal Wrapper
function ModalWrapper({ modal, onClose }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
  }

  const handleOverlayClick = () => {
    if (modal.closeOnOverlay) {
      onClose()
    }
  }

  const handleEsc = (e) => {
    if (e.key === 'Escape' && modal.closeOnEsc) {
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center p-4 pointer-events-auto"
      onClick={handleOverlayClick}
      onKeyDown={handleEsc}
      tabIndex={-1}
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative w-full ${sizes[modal.size]} bg-surface border border-void-border shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {modal.title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-void-border bg-surface-elevated">
            <h2 className="font-display text-lg tracking-wider text-white">{modal.title}</h2>
            {modal.closable && (
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="max-h-[70vh] overflow-auto">
          {modal.component ? (
            <modal.component {...modal.props} close={onClose} />
          ) : null}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-neon-cyan/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-neon-pink/10 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

// Base Modal Component
export function Modal({ isOpen, onClose, title, children, size = 'md', footer }) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw]',
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative w-full ${sizes[size]} bg-surface border border-void-border shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-void-border bg-surface-elevated">
            <h2 className="font-display text-lg tracking-wider text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-white hover:bg-void-border transition-colors rounded-sm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="max-h-[70vh] overflow-auto p-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-void-border bg-surface-elevated">
            {footer}
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-neon-cyan/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-neon-pink/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  )
}

// Confirm Modal Component
export function ConfirmModal({ title, message, confirmText = '确认', cancelText = '取消', onConfirm, onCancel, variant = 'danger' }) {
  const variants = {
    danger: {
      confirmClass: 'bg-neon-pink/20 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/30',
    },
    warning: {
      confirmClass: 'bg-neon-amber/20 border-neon-amber/50 text-neon-amber hover:bg-neon-amber/30',
    },
    info: {
      confirmClass: 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/30',
    },
  }[variant]

  return (
    <div className="text-center">
      <div className="mb-6">
        <p className="text-gray-300">{message}</p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={onCancel} className="btn-secondary">
          {cancelText}
        </button>
        <button onClick={onConfirm} className={`btn-primary ${variants.confirmClass}`}>
          {confirmText}
        </button>
      </div>
    </div>
  )
}
