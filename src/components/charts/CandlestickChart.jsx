import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { chartTheme, commonChartProps } from '../../utils/chartConfig'

export default function CandlestickChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-text-secondary">No data available</div>
  }

  const CandleStick = (props) => {
    const { x, y, width, yAxis, payload } = props
    if (!payload) return null

    const { open, close, high, low } = payload
    const yScale = yAxis.scale

    const xCenter = x + width / 2
    const yOpen = yScale(open)
    const yClose = yScale(close)
    const yHigh = yScale(high)
    const yLow = yScale(low)

    const color = close >= open ? chartTheme.colors.positive : chartTheme.colors.negative

    return (
      <g>
        {/* High-Low Line */}
        <line x1={xCenter} y1={yHigh} x2={xCenter} y2={yLow} stroke={color} strokeWidth={1} />
        {/* Open-Close Box */}
        <rect
          x={xCenter - width / 3}
          y={Math.min(yOpen, yClose)}
          width={(width * 2) / 3}
          height={Math.abs(yClose - yOpen)}
          fill={color}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} {...commonChartProps}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.colors.grid} />
        <XAxis dataKey="date" stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
        <YAxis stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={chartTheme.tooltip.contentStyle}
          labelStyle={chartTheme.tooltip.labelStyle}
          formatter={(value) => `$${value.toFixed(2)}`}
          labelFormatter={(label) => `${label}`}
          content={({ active, payload }) => {
            if (active && payload && payload[0]) {
              const data = payload[0].payload
              return (
                <div className="bg-surface border border-border-color rounded p-3 text-text-primary text-xs">
                  <p>O: ${data.open.toFixed(2)}</p>
                  <p>H: ${data.high.toFixed(2)}</p>
                  <p>L: ${data.low.toFixed(2)}</p>
                  <p>C: ${data.close.toFixed(2)}</p>
                  <p className="text-text-tertiary">V: {(data.volume / 1e6).toFixed(1)}M</p>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="volume" shape={<CandleStick />} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
