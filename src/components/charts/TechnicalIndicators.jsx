import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function TechnicalIndicators({ data, onIndicatorToggle }) {
  const [indicators, setIndicators] = useState({
    sma50: false,
    sma200: false,
    rsi: false,
    macd: false,
  })

  const toggleIndicator = (indicator) => {
    const newState = { ...indicators, [indicator]: !indicators[indicator] }
    setIndicators(newState)
    onIndicatorToggle(newState)
  }

  const indicatorConfig = [
    { key: 'sma50', label: '50MA', description: '50-day Moving Average' },
    { key: 'sma200', label: '200MA', description: '200-day Moving Average' },
    { key: 'rsi', label: 'RSI', description: 'Relative Strength Index' },
    { key: 'macd', label: 'MACD', description: 'Moving Average Convergence Divergence' },
  ]

  return (
    <div className="card p-4 mt-4">
      <h3 className="text-text-primary font-semibold mb-4">Technical Indicators</h3>
      <div className="grid grid-cols-2 gap-3">
        {indicatorConfig.map((indicator) => (
          <button
            key={indicator.key}
            onClick={() => toggleIndicator(indicator.key)}
            className={`p-3 rounded-lg border transition-all duration-200 text-left ${
              indicators[indicator.key]
                ? 'bg-primary bg-opacity-10 border-primary'
                : 'bg-surface border-border-color hover:bg-surface-hover'
            }`}
            title={indicator.description}
          >
            <div className="flex items-center justify-between">
              <span className="text-text-primary font-medium text-sm">{indicator.label}</span>
              {indicators[indicator.key] ? (
                <Eye size={16} className="text-primary" />
              ) : (
                <EyeOff size={16} className="text-text-tertiary" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
