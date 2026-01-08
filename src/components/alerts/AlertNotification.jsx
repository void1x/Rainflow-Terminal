import { X, AlertCircle } from 'lucide-react'

export default function AlertNotification({ alert, onClose }) {
  return (
    <div className="bg-success border border-success border-opacity-50 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="text-success flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h4 className="text-success font-semibold">Alert Triggered!</h4>
        <p className="text-text-secondary text-sm mt-1">
          {alert.symbol} price has {alert.condition === 'above' ? 'exceeded' : 'fallen below'} ${alert.price}
        </p>
      </div>
      <button onClick={onClose} className="text-success hover:text-opacity-75">
        <X size={18} />
      </button>
    </div>
  )
}
