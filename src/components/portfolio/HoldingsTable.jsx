import { Trash2, Edit2 } from 'lucide-react'
import { formatCurrency, formatPercent } from '../../utils/formatters'

export default function HoldingsTable({ positions, currentPrices, onEdit, onDelete }) {
  return (
    <div className="card p-6 overflow-x-auto">
      <h3 className="text-text-primary font-semibold mb-4">Holdings</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-color">
            <th className="text-text-secondary text-left py-3 px-2">Symbol</th>
            <th className="text-text-secondary text-left py-3 px-2">Shares</th>
            <th className="text-text-secondary text-left py-3 px-2">Avg Cost</th>
            <th className="text-text-secondary text-left py-3 px-2">Current Price</th>
            <th className="text-text-secondary text-left py-3 px-2">Market Value</th>
            <th className="text-text-secondary text-left py-3 px-2">Gain/Loss</th>
            <th className="text-text-secondary text-left py-3 px-2">Return %</th>
            <th className="text-text-secondary text-left py-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => {
            const currentPrice = currentPrices[position.symbol] || 0
            const marketValue = position.shares * currentPrice
            const cost = position.shares * position.avgCost
            const gainLoss = marketValue - cost
            const returnPercent = (gainLoss / cost) * 100
            const isPositive = gainLoss >= 0

            return (
              <tr key={position.id} className="border-b border-border-color hover:bg-surface-hover transition">
                <td className="py-3 px-2 text-text-primary font-semibold">{position.symbol}</td>
                <td className="py-3 px-2 text-text-primary">{position.shares}</td>
                <td className="py-3 px-2 text-text-primary">{formatCurrency(position.avgCost)}</td>
                <td className="py-3 px-2 text-text-primary">{formatCurrency(currentPrice)}</td>
                <td className="py-3 px-2 text-text-primary font-semibold">{formatCurrency(marketValue)}</td>
                <td className={`py-3 px-2 font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(gainLoss)}
                </td>
                <td className={`py-3 px-2 font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {formatPercent(returnPercent)}
                </td>
                <td className="py-3 px-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(position)}
                      className="p-1.5 hover:bg-primary hover:bg-opacity-20 rounded transition text-primary"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(position.id)}
                      className="p-1.5 hover:bg-danger hover:bg-opacity-20 rounded transition text-danger"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
