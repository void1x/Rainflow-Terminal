import { createContext, useState, useEffect } from 'react'

export const AlertsContext = createContext()

export function AlertsProvider({ children }) {
  const [alerts, setAlerts] = useState([])
  const [triggeredAlerts, setTriggeredAlerts] = useState([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('alerts')
    if (saved) {
      setAlerts(JSON.parse(saved))
    } else {
      const defaultAlerts = [
        { id: '1', symbol: 'AAPL', condition: 'above', price: 200, status: 'active', createdDate: '2024-01-15', expiryDate: '2024-02-15' },
        { id: '2', symbol: 'MSFT', condition: 'below', price: 350, status: 'active', createdDate: '2024-01-20', expiryDate: '2024-02-20' },
        { id: '3', symbol: 'GOOGL', condition: 'above', price: 150, status: 'active', createdDate: '2024-02-01', expiryDate: '2024-03-01' },
        { id: '4', symbol: 'TSLA', condition: 'below', price: 220, status: 'expired', createdDate: '2024-01-10', expiryDate: '2024-01-20' },
        { id: '5', symbol: 'NVDA', condition: 'above', price: 900, status: 'triggered', createdDate: '2024-02-05', expiryDate: '2024-03-05', triggeredPrice: 880 },
      ]
      setAlerts(defaultAlerts)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('alerts', JSON.stringify(alerts))
  }, [alerts])

  const addAlert = (alert) => {
    const id = Date.now().toString()
    const newAlert = {
      id,
      ...alert,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
    }
    setAlerts([...alerts, newAlert])
  }

  const updateAlert = (id, updatedAlert) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, ...updatedAlert } : a)))
  }

  const deleteAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id))
  }

  const triggerAlert = (id, currentPrice) => {
    updateAlert(id, { status: 'triggered', triggeredPrice: currentPrice })
    setTriggeredAlerts([...triggeredAlerts, id])
    setTimeout(() => {
      setTriggeredAlerts((prev) => prev.filter((alertId) => alertId !== id))
    }, 5000)
  }

  return (
    <AlertsContext.Provider value={{ alerts, triggeredAlerts, addAlert, updateAlert, deleteAlert, triggerAlert }}>
      {children}
    </AlertsContext.Provider>
  )
}
