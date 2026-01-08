import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useChartData } from '../../hooks/useChartData'
import { useRealtimePrice } from '../../hooks/useRealtimePrice'
import { getStockData } from '../../data/mockData'
import CandlestickChart from './CandlestickChart'
import TimeframeSelector from './TimeframeSelector'
import VolumeChart from './VolumeChart'
import TechnicalIndicators from './TechnicalIndicators'
import ChartControls from './ChartControls'
import { chartTheme, commonChartProps } from '../../utils/chartConfig'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function AdvancedStockChart({ symbol }) {
  const [chartType, setChartType] = useState('line')
  const [timeframe, setTimeframe] = useState('1M')
  const [indicators, setIndicators] = useState({ sma50: false, sma200: false, rsi: false, macd: false })
  const [zoom, setZoom] = useState(1)

  const stockData = getStockData(symbol)
  const { price, change, changePercent } = useRealtimePrice(stockData?.basePrice || 100)
  const chartData = useChartData(stockData?.basePrice || 100, timeframe)

  const isPositive = change >= 0

  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2))
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5))
  const handleReset = () => setZoom(1)

  if (!stockData || chartData.length === 0) {
    return <div className="text-text-secondary">Loading...</div>
  }

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

      {/* Controls */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-color">
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              chartType === 'line'
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('candlestick')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              chartType === 'candlestick'
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary hover:text-text-primary'
            }`}
          >
            Candlestick
          </button>
        </div>
        <ChartControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />
      </div>

      {/* Chart */}
      <div style={{ width: '100%', height: `${400 * zoom}px` }} className="mb-8">
        {chartType === 'line' ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.colors.grid} />
              <XAxis dataKey="date" stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} />
              <YAxis stroke={chartTheme.colors.text} style={{ fontSize: '12px' }} domain="dataMin" />
              <Tooltip
                contentStyle={chartTheme.tooltip.contentStyle}
                labelStyle={chartTheme.tooltip.labelStyle}
                formatter={(value) => `$${value.toFixed(2)}`}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isPositive ? chartTheme.colors.positive : chartTheme.colors.negative}
                dot={false}
                strokeWidth={2.5}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <CandlestickChart data={chartData} />
        )}
      </div>

      {/* Volume Chart */}
      <VolumeChart data={chartData} />

      {/* Technical Indicators */}
      <TechnicalIndicators data={chartData} onIndicatorToggle={setIndicators} />

      {/* Timeframe Selector */}
      <TimeframeSelector selectedTimeframe={timeframe} onTimeframeChange={setTimeframe} />
    </div>
  )
}
