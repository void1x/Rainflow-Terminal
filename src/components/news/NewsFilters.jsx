import { Search } from 'lucide-react'

export default function NewsFilters({ onFilterChange, stocks }) {
  return (
    <div className="card p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Search</label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search news..."
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="w-full pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Symbol</label>
          <select onChange={(e) => onFilterChange('symbol', e.target.value)} className="w-full bg-surface border border-border-color rounded-lg text-text-primary">
            <option value="">All Symbols</option>
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Sentiment</label>
          <select onChange={(e) => onFilterChange('sentiment', e.target.value)} className="w-full bg-surface border border-border-color rounded-lg text-text-primary">
            <option value="">All Sentiments</option>
            <option value="bullish">Bullish</option>
            <option value="neutral">Neutral</option>
            <option value="bearish">Bearish</option>
          </select>
        </div>
      </div>
    </div>
  )
}
