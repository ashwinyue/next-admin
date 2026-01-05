/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#0a0a0f',
        'void-light': '#12121a',
        'void-border': '#1e1e2e',
        'neon-cyan': '#00f5ff',
        'neon-amber': '#ffaa00',
        'neon-pink': '#ff006e',
        'neon-green': '#00ff9f',
        'surface': '#0d0d14',
        'surface-elevated': '#15151f',
      },
      fontFamily: {
        'mono': ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        'display': ['"Syncopate"', '"Orbitron"', 'sans-serif'],
        'sans': ['"Inter"', '"IBM Plex Sans"', 'sans-serif'],
      },
      animation: {
        'scan': 'scan 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1e1e2e 1px, transparent 1px), linear-gradient(to bottom, #1e1e2e 1px, transparent 1px)",
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}
