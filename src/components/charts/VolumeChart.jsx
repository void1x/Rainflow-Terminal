import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chartTheme, commonChartProps } from '../../utils/chartConfig'
import { formatLargeNumber } from '../../utils/formatters'

export default function VolumeChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-text-secondary">No volume data</div>
  }

  return (
    <div className="card p-4 mt-4">
      <h3 className="text-text-primary font-semibold mb-4">Volume</h3>
      <div style={{ width: '100%', height: '150px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} {...commonChartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.colors.grid} />
            <XAxis dataKey="date" stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
            <YAxis stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={chartTheme.tooltip.contentStyle}
              labelStyle={chartTheme.tooltip.labelStyle}
              formatter={(value) => formatLargeNumber(value)}
            />
            <Bar dataKey="volume" fill={chartTheme.colors.primary} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
