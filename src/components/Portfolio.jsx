import { generatePortfolio, getStockData } from '../data/mockData'
import { useRealtimePrice } from '../hooks/useRealtimePrice'
import { Briefcase, TrendingUp } from 'lucide-react'

function PortfolioItem({ symbol, shares, avgCost }) {
  const stockData = getStockData(symbol)
  const { price } = useRealtimePrice(stockData?.basePrice || 100)

  const currentValue = price * shares
  const initialValue = avgCost * shares
  const gainLoss = currentValue - initialValue
  const gainLossPercent = (gainLoss / initialValue) * 100
  const isPositive = gainLoss >= 0

  return (
    <div className="flex items-center justify-between py-3 border-b border-border-color last:border-b-0 hover:bg-surface-hover px-2 rounded transition-colors">
      <div>
        <p className="text-text-primary font-semibold text-sm">{symbol}</p>
        <p className="text-text-tertiary text-xs mt-0.5">{shares} shares @ ${avgCost.toFixed(2)}</p>
      </div>
      <div className="text-right">
        <p className="text-text-primary font-semibold text-sm">${currentValue.toFixed(2)}</p>
        <p className={`text-xs font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? '+' : ''}{gainLoss.toFixed(2)} ({isPositive ? '+' : ''}{gainLossPercent.toFixed(2)}%)
        </p>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const portfolio = generatePortfolio()

  const totalValue = portfolio.reduce((sum, item) => {
    const stockData = getStockData(item.symbol)
    return sum + (stockData?.basePrice || 0) * item.shares
  }, 0)

  const totalCost = portfolio.reduce((sum, item) => {
    return sum + item.avgCost * item.shares
  }, 0)

  const totalGainLoss = totalValue - totalCost
  const totalGainLossPercent = (totalGainLoss / totalCost) * 100
  const isPositive = totalGainLoss >= 0

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
          <Briefcase size={20} className="text-primary" />
        </div>
        <h3 className="text-text-primary font-bold text-lg">Portfolio</h3>
      </div>

      <div className="mb-6 pb-6 border-b border-border-color">
        <p className="text-text-tertiary text-xs font-medium mb-2">Total Value</p>
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-text-primary">${totalValue.toFixed(2)}</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
            isPositive ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'
          }`}>
            {isPositive ? '+' : ''}{totalGainLoss.toFixed(2)} ({isPositive ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {portfolio.map((item) => (
          <PortfolioItem
            key={item.symbol}
            symbol={item.symbol}
            shares={item.shares}
            avgCost={item.avgCost}
          />
        ))}
      </div>
    </div>
  )
}
