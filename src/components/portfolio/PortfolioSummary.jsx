import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatPercent } from '../../utils/formatters'

export default function PortfolioSummary({ totalValue, totalCost, gainLoss, returnPercent, dailyChange }) {
  const isGainPositive = gainLoss >= 0
  const isDailyPositive = dailyChange >= 0

  const metrics = [
    {
      label: 'Total Value',
      value: formatCurrency(totalValue),
      icon: null,
    },
    {
      label: 'Total Gain/Loss',
      value: formatCurrency(gainLoss),
      subtext: formatPercent(returnPercent),
      isPositive: isGainPositive,
    },
    {
      label: 'Today\'s Change',
      value: formatCurrency(dailyChange),
      subtext: formatPercent((dailyChange / totalValue) * 100),
      isPositive: isDailyPositive,
    },
    {
      label: 'Portfolio Return',
      value: formatPercent(returnPercent),
      isPositive: isGainPositive,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="card p-6">
          <p className="text-text-tertiary text-sm mb-2">{metric.label}</p>
          <div className={`text-2xl font-bold ${metric.isPositive ? 'text-success' : 'text-danger'}`}>
            {metric.value}
          </div>
          {metric.subtext && <p className="text-text-tertiary text-sm mt-1">{metric.subtext}</p>}
        </div>
      ))}
    </div>
  )
}
