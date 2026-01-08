import { useState, useEffect } from 'react'
import { useAlerts } from '../../hooks/useAlerts'
import { generateAllStocksData } from '../../data/mockData'
import AlertCard from './AlertCard'
import CreateAlertModal from './CreateAlertModal'
import { Plus } from 'lucide-react'

export default function AlertsPage() {
  const { alerts, addAlert, updateAlert, deleteAlert } = useAlerts()
  const [currentPrices, setCurrentPrices] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const updatePrices = () => {
      try {
        const stocks = generateAllStocksData()
        const priceMap = {}
        stocks.forEach((stock) => {
          priceMap[stock.symbol] = stock.price
        })
        setCurrentPrices(priceMap)
      } catch (error) {
        console.error('Error updating prices:', error)
      }
    }

    updatePrices()
    const interval = setInterval(updatePrices, 3000)
    return () => clearInterval(interval)
  }, [])

  const groupedAlerts = {
    active: alerts.filter((a) => a.status === 'active'),
    triggered: alerts.filter((a) => a.status === 'triggered'),
    expired: alerts.filter((a) => a.status === 'expired'),
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">Price Alerts</h1>
            <p className="text-text-tertiary">Set up and manage price alerts</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg transition"
          >
            <Plus size={18} />
            New Alert
          </button>
        </div>

        {groupedAlerts.active.length > 0 && (
          <div className="mb-8">
            <h2 className="text-text-primary font-semibold text-lg mb-4">Active Alerts ({groupedAlerts.active.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAlerts.active.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  currentPrice={currentPrices[alert.symbol] || 0}
                  onEdit={(a) => console.log('Edit alert:', a)}
                  onDelete={deleteAlert}
                />
              ))}
            </div>
          </div>
        )}

        {groupedAlerts.triggered.length > 0 && (
          <div className="mb-8">
            <h2 className="text-success font-semibold text-lg mb-4">Triggered Alerts ({groupedAlerts.triggered.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAlerts.triggered.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  currentPrice={currentPrices[alert.symbol] || 0}
                  onEdit={(a) => console.log('Edit alert:', a)}
                  onDelete={deleteAlert}
                />
              ))}
            </div>
          </div>
        )}

        {groupedAlerts.expired.length > 0 && (
          <div className="mb-8">
            <h2 className="text-text-tertiary font-semibold text-lg mb-4">Expired Alerts ({groupedAlerts.expired.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAlerts.expired.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  currentPrice={currentPrices[alert.symbol] || 0}
                  onEdit={(a) => console.log('Edit alert:', a)}
                  onDelete={deleteAlert}
                />
              ))}
            </div>
          </div>
        )}

        {alerts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-tertiary">No alerts yet. Create one to get started!</p>
          </div>
        )}

        <CreateAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addAlert} />
      </div>
    </div>
  )
}
