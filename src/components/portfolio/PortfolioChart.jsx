import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chartTheme } from '../../utils/chartConfig'
import { formatCurrency } from '../../utils/formatters'

export default function PortfolioChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-text-secondary">No data available</div>
  }

  const minValue = Math.min(...data.map((d) => d.value))
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="card p-6">
      <h3 className="text-text-primary font-semibold mb-4">Portfolio Performance (30 Days)</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.colors.grid} />
            <XAxis dataKey="date" stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
            <YAxis stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} domain={[minValue, maxValue]} />
            <Tooltip
              contentStyle={chartTheme.tooltip.contentStyle}
              labelStyle={chartTheme.tooltip.labelStyle}
              formatter={(value) => formatCurrency(value)}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartTheme.colors.primary}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
