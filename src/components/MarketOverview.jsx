import { TrendingUp, TrendingDown } from 'lucide-react'
import { marketIndices, generateAllStocksData, getTopGainers, getTopLosers } from '../data/mockData'
import StockCard from './StockCard'

export default function MarketOverview() {
  const stocks = generateAllStocksData()
  const gainers = getTopGainers(stocks)
  const losers = getTopLosers(stocks)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-primary to-info rounded-full"></div>
          Market Indices
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {marketIndices.map((index) => (
            <div key={index.symbol} className="card p-6 hover:shadow-card-hover group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-text-tertiary text-sm font-medium mb-3">{index.name}</h3>
                  <span className="text-3xl font-bold text-text-primary">{(index.price / 1000).toFixed(1)}K</span>
                </div>
                <div className={`p-3 rounded-lg ${index.change >= 0 ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}`}>
                  {index.change >= 0 ? (
                    <TrendingUp size={20} className="text-success" />
                  ) : (
                    <TrendingDown size={20} className="text-danger" />
                  )}
                </div>
              </div>
              <div className={`mt-4 flex items-center gap-2 text-sm font-semibold ${index.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
                <span className="text-text-tertiary">({index.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-success to-primary rounded-full"></div>
            <h2 className="text-xl font-bold text-text-primary">Top Gainers</h2>
          </div>
          <div className="space-y-3">
            {gainers.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-danger to-warning rounded-full"></div>
            <h2 className="text-xl font-bold text-text-primary">Top Losers</h2>
          </div>
          <div className="space-y-3">
            {losers.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
