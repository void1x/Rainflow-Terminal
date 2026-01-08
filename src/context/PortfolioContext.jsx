import { createContext, useState, useEffect } from 'react'

export const PortfolioContext = createContext()

export function PortfolioProvider({ children }) {
  const [positions, setPositions] = useState([])
  const [transactions, setTransactions] = useState([])
  const [metrics, setMetrics] = useState({ sharpeRatio: 0, beta: 0, volatility: 0 })

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portfolio')
    if (saved) {
      const data = JSON.parse(saved)
      setPositions(data.positions || [])
      setTransactions(data.transactions || [])
    } else {
      // Initialize with default portfolio
      const defaultPositions = [
        { id: '1', symbol: 'AAPL', shares: 50, avgCost: 175.00, purchaseDate: '2024-01-15' },
        { id: '2', symbol: 'MSFT', shares: 30, avgCost: 320.00, purchaseDate: '2024-02-01' },
        { id: '3', symbol: 'GOOGL', shares: 100, avgCost: 120.00, purchaseDate: '2024-01-20' },
        { id: '4', symbol: 'TSLA', shares: 25, avgCost: 200.00, purchaseDate: '2024-03-10' },
        { id: '5', symbol: 'NVDA', shares: 20, avgCost: 650.00, purchaseDate: '2024-01-05' },
      ]
      const defaultTransactions = [
        { id: '1', type: 'buy', symbol: 'AAPL', shares: 50, price: 175.00, date: '2024-01-15' },
        { id: '2', type: 'buy', symbol: 'MSFT', shares: 30, price: 320.00, date: '2024-02-01' },
        { id: '3', type: 'buy', symbol: 'GOOGL', shares: 100, price: 120.00, date: '2024-01-20' },
        { id: '4', type: 'buy', symbol: 'TSLA', shares: 25, price: 200.00, date: '2024-03-10' },
        { id: '5', type: 'buy', symbol: 'NVDA', shares: 20, price: 650.00, date: '2024-01-05' },
      ]
      setPositions(defaultPositions)
      setTransactions(defaultTransactions)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify({ positions, transactions }))
  }, [positions, transactions])

  const addPosition = (position) => {
    const id = Date.now().toString()
    const newPosition = { id, ...position }
    setPositions([...positions, newPosition])
    const transaction = {
      id: Date.now().toString() + 'tx',
      type: 'buy',
      symbol: position.symbol,
      shares: position.shares,
      price: position.avgCost,
      date: position.purchaseDate || new Date().toISOString().split('T')[0],
    }
    setTransactions([...transactions, transaction])
  }

  const updatePosition = (id, updatedPosition) => {
    setPositions(positions.map((p) => (p.id === id ? { id, ...updatedPosition } : p)))
  }

  const deletePosition = (id) => {
    setPositions(positions.filter((p) => p.id !== id))
  }

  return (
    <PortfolioContext.Provider value={{ positions, transactions, metrics, addPosition, updatePosition, deletePosition }}>
      {children}
    </PortfolioContext.Provider>
  )
}
