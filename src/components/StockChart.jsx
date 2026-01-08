import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { generateHistoricalData, getStockData } from '../data/mockData'
import { useRealtimePrice } from '../hooks/useRealtimePrice'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StockChart({ symbol }) {
  const [chartData, setChartData] = useState([])
  const stockData = getStockData(symbol)
  const { price, change, changePercent } = useRealtimePrice(stockData?.basePrice || 100)

  useEffect(() => {
    if (stockData) {
      const data = generateHistoricalData(stockData.basePrice)
      setChartData(data)
    }
  }, [symbol, stockData])

  if (!stockData || chartData.length === 0) {
    return <div className="text-text-secondary">Loading...</div>
  }

  const isPositive = change >= 0

  return (
    <div className="card p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-text-primary">{symbol}</h2>
          <p className="text-text-tertiary text-sm mt-1">{stockData.name}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-text-primary">${price.toFixed(2)}</div>
          <div className={`flex items-center justify-end gap-2 mt-2 text-lg font-semibold ${
            isPositive ? 'text-success' : 'text-danger'
          }`}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
            <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
            <span className="text-text-tertiary">({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: '400px' }} className="mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="date" stroke="#a0aec0" style={{ fontSize: '12px' }} />
            <YAxis stroke="#a0aec0" style={{ fontSize: '12px' }} domain="dataMin" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a202c',
                border: '1px solid #2d3748',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
              labelStyle={{ color: '#f7fafc' }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-3 justify-center pt-4 border-t border-border-color">
        {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((range) => (
          <button
            key={range}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-all duration-200"
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}
