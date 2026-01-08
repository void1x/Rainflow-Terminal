import { useState } from 'react'
import { X } from 'lucide-react'

export default function CreateAlertModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    symbol: '',
    condition: 'above',
    price: '',
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.symbol && formData.price) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      })
      setFormData({
        symbol: '',
        condition: 'above',
        price: '',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-text-primary font-semibold text-lg">Create Alert</h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-primary">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="e.g., AAPL"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full bg-surface border border-border-color rounded-lg text-text-primary"
            >
              <option value="above">Goes above</option>
              <option value="below">Falls below</option>
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Alert price"
              className="w-full"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-surface hover:bg-surface-hover text-text-primary transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-primary hover:bg-opacity-90 text-white font-medium transition"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
