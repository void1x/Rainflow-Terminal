export const chartTheme = {
  colors: {
    positive: '#10b981',
    negative: '#ef4444',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    grid: '#2d3748',
    text: '#a0aec0',
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#1a202c',
      border: '1px solid #2d3748',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    labelStyle: { color: '#f7fafc' },
  },
}

export const commonChartProps = {
  margin: { top: 5, right: 30, left: 0, bottom: 5 },
  wrapperStyle: { width: '100%', height: '100%' },
}

export const getChartHeight = (variant = 'default') => {
  const heights = {
    small: 200,
    default: 400,
    large: 600,
  }
  return heights[variant] || heights.default
}
