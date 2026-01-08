import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatPercent } from '../../utils/formatters'

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#6366f1']

export default function AssetAllocation({ positions, currentPrices }) {
  const data = positions.map((position) => {
    const value = position.shares * (currentPrices[position.symbol] || 0)
    return {
      name: position.symbol,
      value: parseFloat(value.toFixed(2)),
      shares: position.shares,
      price: currentPrices[position.symbol] || 0,
    }
  })

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="card p-6">
      <h3 className="text-text-primary font-semibold mb-4">Asset Allocation</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a202c',
                border: '1px solid #2d3748',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#f7fafc' }}
              formatter={(value) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div key={item.name} className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[data.indexOf(item) % COLORS.length] }}
              ></div>
              <span className="text-text-primary font-medium">{item.name}</span>
            </div>
            <p className="text-text-tertiary text-xs ml-5">
              {formatCurrency(item.value)} ({formatPercent((item.value / totalValue) * 100)})
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
