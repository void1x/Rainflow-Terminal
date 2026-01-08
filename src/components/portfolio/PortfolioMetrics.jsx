import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function PortfolioMetrics({ sharpeRatio, beta, volatility }) {
  const metricsData = [
    {
      name: 'Sharpe Ratio',
      value: sharpeRatio.toFixed(2),
      description: 'Risk-adjusted return',
      color: 'text-primary',
    },
    {
      name: 'Beta',
      value: beta.toFixed(2),
      description: 'Market correlation',
      color: beta > 1 ? 'text-danger' : 'text-success',
    },
    {
      name: 'Volatility',
      value: (volatility * 100).toFixed(2) + '%',
      description: 'Annual volatility',
      color: 'text-warning',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {metricsData.map((metric) => (
        <div key={metric.name} className="card p-4">
          <p className="text-text-tertiary text-xs mb-1">{metric.description}</p>
          <p className="text-text-secondary text-sm font-medium mb-1">{metric.name}</p>
          <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
        </div>
      ))}
    </div>
  )
}
