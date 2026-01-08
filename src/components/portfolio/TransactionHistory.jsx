import { formatCurrency, formatDate } from '../../utils/formatters'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function TransactionHistory({ transactions }) {
  const sortedTransactions = [...transactions].reverse()

  return (
    <div className="card p-6 mt-6">
      <h3 className="text-text-primary font-semibold mb-4">Transaction History</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedTransactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
            <div className="flex items-center gap-3">
              {transaction.type === 'buy' ? (
                <TrendingUp className="text-success" size={20} />
              ) : (
                <TrendingDown className="text-danger" size={20} />
              )}
              <div>
                <p className="text-text-primary font-semibold">{transaction.symbol}</p>
                <p className="text-text-tertiary text-sm">
                  {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.shares} shares
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-text-primary font-semibold">{formatCurrency(transaction.price * transaction.shares)}</p>
              <p className="text-text-tertiary text-sm">{formatDate(transaction.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
