import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StockCard({ stock }) {
  const isPositive = stock.change >= 0

  return (
    <div className="card p-4 hover:shadow-card-hover hover:border-primary group transition-all">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-text-primary font-semibold text-sm">{stock.symbol}</h3>
          <p className="text-text-tertiary text-xs mt-1">{stock.name}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${
          isPositive ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'
        }`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border-color">
        <div className="text-text-primary font-semibold text-lg">${stock.price.toFixed(2)}</div>
        <div className={`text-xs mt-1 font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? '+' : ''}{stock.change.toFixed(2)}
        </div>
      </div>
    </div>
  )
}
