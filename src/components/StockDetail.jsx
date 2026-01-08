import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import AdvancedStockChart from './charts/AdvancedStockChart'
import { useWatchlist } from '../hooks/useWatchlist'

export default function StockDetail() {
  const { symbol } = useParams()
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    if (symbol) {
      setInWatchlist(isInWatchlist(symbol))
    }
  }, [symbol, isInWatchlist])

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(symbol)
    } else {
      addToWatchlist(symbol)
    }
    setInWatchlist(!inWatchlist)
  }

  if (!symbol) {
    return <div className="text-text-secondary">Stock not found</div>
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-text-primary">{symbol}</h1>
            <p className="text-text-tertiary mt-2">Stock Detail Analysis</p>
          </div>
          <button
            onClick={toggleWatchlist}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              inWatchlist
                ? 'bg-primary text-white'
                : 'bg-surface hover:bg-surface-hover text-text-primary'
            }`}
          >
            <Star size={18} fill={inWatchlist ? 'currentColor' : 'none'} />
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>

        <AdvancedStockChart symbol={symbol} />
      </div>
    </div>
  )
}
