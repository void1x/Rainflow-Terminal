import { useState, useEffect } from 'react'
import { generateWatchlist } from '../data/mockData'
import { Eye, TrendingUp, TrendingDown } from 'lucide-react'

function WatchlistItem({ stock, onClick }) {
  const isPositive = stock.change >= 0

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between py-3 px-2 hover:bg-surface-hover rounded cursor-pointer transition-all border-b border-border-color last:border-b-0 group"
    >
      <div className="flex-1">
        <p className="text-text-primary font-semibold text-sm group-hover:text-primary transition-colors">{stock.symbol}</p>
        <p className="text-text-tertiary text-xs mt-0.5">${stock.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-0.5 px-2 py-1 rounded-md text-xs font-semibold ${
          isPositive ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

export default function Watchlist({ onStockSelect }) {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    setWatchlist(generateWatchlist())

    const interval = setInterval(() => {
      setWatchlist(generateWatchlist())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-info bg-opacity-10 rounded-lg">
          <Eye size={20} className="text-info" />
        </div>
        <h3 className="text-text-primary font-bold text-lg">Watchlist</h3>
      </div>
      <div className="space-y-0">
        {watchlist.map((stock) => (
          <WatchlistItem
            key={stock.symbol}
            stock={stock}
            onClick={() => onStockSelect(stock.symbol)}
          />
        ))}
      </div>
    </div>
  )
}
