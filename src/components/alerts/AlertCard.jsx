import { Trash2, Edit2 } from 'lucide-react'
import AlertBadge from './AlertBadge'
import { formatCurrency, formatDate } from '../../utils/formatters'

export default function AlertCard({ alert, onEdit, onDelete, currentPrice }) {
  const isTriggered = alert.status === 'triggered'
  const shouldTrigger = alert.condition === 'above' ? currentPrice >= alert.price : currentPrice <= alert.price

  return (
    <div className={`card p-4 ${isTriggered ? 'bg-opacity-20 border-success' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-text-primary font-semibold text-lg">{alert.symbol}</h3>
          <p className="text-text-tertiary text-sm">
            Alert when price {alert.condition === 'above' ? 'goes above' : 'falls below'} {formatCurrency(alert.price)}
          </p>
        </div>
        <AlertBadge status={alert.status} />
      </div>

      <div className="bg-surface rounded p-3 mb-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-tertiary">Current Price:</span>
          <span className="text-text-primary font-semibold">{formatCurrency(currentPrice)}</span>
        </div>
        {shouldTrigger && (
          <div className="mt-2 p-2 bg-success bg-opacity-10 text-success text-xs rounded">
            Alert condition met!
          </div>
        )}
      </div>

      <div className="text-xs text-text-tertiary mb-3">
        <p>Created: {formatDate(alert.createdDate)}</p>
        <p>Expires: {formatDate(alert.expiryDate)}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(alert)}
          className="flex-1 px-3 py-1.5 rounded text-sm bg-surface hover:bg-surface-hover text-text-primary transition flex items-center justify-center gap-2"
        >
          <Edit2 size={14} />
          Edit
        </button>
        <button
          onClick={() => onDelete(alert.id)}
          className="flex-1 px-3 py-1.5 rounded text-sm bg-danger bg-opacity-10 hover:bg-opacity-20 text-danger transition flex items-center justify-center gap-2"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  )
}
