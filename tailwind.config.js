/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': '#151d3b',
        'surface': 'var(--surface)',
        'surface-hover': '#202d4d',
        'border-color': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': '#a0aec0',
        'success': '#10b981',
        'success-light': '#d1fae5',
        'danger': '#ef4444',
        'danger-light': '#fee2e2',
        'warning': '#f59e0b',
        'info': '#3b82f6',
        'primary': '#6366f1',
        'primary-light': '#e0e7ff',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['13px', { lineHeight: '20px' }],
        'base': ['14px', { lineHeight: '24px' }],
        'lg': ['16px', { lineHeight: '24px' }],
        'xl': ['18px', { lineHeight: '28px' }],
        '2xl': ['20px', { lineHeight: '28px' }],
        '3xl': ['24px', { lineHeight: '32px' }],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-up': 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
        'gradient-down': 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
