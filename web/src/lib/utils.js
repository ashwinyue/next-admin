// Utility functions for the application

/**
 * Format a number with comma separators
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString, locale = 'zh-CN') {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

/**
 * Format a relative time string (e.g., "2 minutes ago")
 */
export function formatRelativeTime(dateString, locale = 'zh-CN') {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.floor((now - date) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  const intervals = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
  ]

  for (const { unit, seconds } of intervals) {
    const interval = Math.floor(diff / seconds)
    if (interval >= 1) {
      return rtf.format(-interval, unit)
    }
  }

  return rtf.format(-diff, 'second')
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, maxLength = 50) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Sleep for a specified duration
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Debounce a function
 */
export function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(size < 10 ? 1 : 0)} ${units[unitIndex]}`
}

/**
 * Get initials from a name
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
