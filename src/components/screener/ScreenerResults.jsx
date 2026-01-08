import { TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react'
import { formatCurrency, formatPercent, formatLargeNumber } from '../../utils/formatters'

export default function ScreenerResults({ results, sortBy, onSort }) {
  const handleSort = (key) => {
    onSort(key)
  }

  const SortIcon = ({ field }) => {
    if (sortBy.field !== field) return <ArrowUpDown size={14} className="opacity-30" />
    return sortBy.direction === 'asc' ? <TrendingUp size={14} /> : <TrendingDown size={14} />
  }

  return (
    <div className="card p-6 overflow-x-auto">
      <h3 className="text-text-primary font-semibold mb-4">Results ({results.length} stocks)</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-color">
            <th className="text-text-secondary text-left py-3 px-2 cursor-pointer hover:text-text-primary" onClick={() => handleSort('symbol')}>
              <div className="flex items-center gap-1">
                Symbol <SortIcon field="symbol" />
              </div>
            </th>
            <th className="text-text-secondary text-left py-3 px-2 cursor-pointer hover:text-text-primary" onClick={() => handleSort('price')}>
              <div className="flex items-center gap-1">
                Price <SortIcon field="price" />
              </div>
            </th>
            <th className="text-text-secondary text-left py-3 px-2 cursor-pointer hover:text-text-primary" onClick={() => handleSort('change')}>
              <div className="flex items-center gap-1">
                Change <SortIcon field="change" />
              </div>
            </th>
            <th className="text-text-secondary text-left py-3 px-2 cursor-pointer hover:text-text-primary" onClick={() => handleSort('volume')}>
              <div className="flex items-center gap-1">
                Volume <SortIcon field="volume" />
              </div>
            </th>
            <th className="text-text-secondary text-left py-3 px-2 cursor-pointer hover:text-text-primary" onClick={() => handleSort('marketCap')}>
              <div className="flex items-center gap-1">
                Market Cap <SortIcon field="marketCap" />
              </div>
            </th>
            <th className="text-text-secondary text-left py-3 px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((stock) => {
            const isPositive = stock.changePercent >= 0
            return (
              <tr key={stock.symbol} className="border-b border-border-color hover:bg-surface-hover transition">
                <td className="py-3 px-2 text-text-primary font-semibold">{stock.symbol}</td>
                <td className="py-3 px-2 text-text-primary">{formatCurrency(stock.price)}</td>
                <td className={`py-3 px-2 font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  <div className="flex items-center gap-1">
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {formatPercent(stock.changePercent)}
                  </div>
                </td>
                <td className="py-3 px-2 text-text-primary">{formatLargeNumber(stock.volume)}</td>
                <td className="py-3 px-2 text-text-primary">${(stock.marketCap / 1e9).toFixed(1)}B</td>
                <td className="py-3 px-2">
                  <a href={`/stock/${stock.symbol}`} className="text-primary hover:text-opacity-80 text-sm font-medium transition">
                    View
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {results.length === 0 && (
        <div className="text-center py-8 text-text-tertiary">No stocks match the selected filters</div>
      )}
    </div>
  )
}
