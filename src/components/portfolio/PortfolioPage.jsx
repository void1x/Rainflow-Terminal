import { useState, useEffect } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio'
import { generateAllStocksData } from '../../data/mockData'
import { generatePortfolioHistoryData } from '../../data/chartDataGenerators'
import { calculatePortfolioValue, calculatePortfolioCost, calculatePortfolioGainLoss, calculatePortfolioReturn } from '../../utils/calculations'
import PortfolioSummary from './PortfolioSummary'
import HoldingsTable from './HoldingsTable'
import AssetAllocation from './AssetAllocation'
import PortfolioChart from './PortfolioChart'
import TransactionHistory from './TransactionHistory'
import PortfolioMetrics from './PortfolioMetrics'
import AddPositionModal from './AddPositionModal'
import { Plus } from 'lucide-react'

export default function PortfolioPage() {
  const { positions, transactions, addPosition, updatePosition, deletePosition } = usePortfolio()
  const [currentPrices, setCurrentPrices] = useState({})
  const [portfolioHistory, setPortfolioHistory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    try {
      const allStocks = generateAllStocksData()
      const priceMap = {}
      allStocks.forEach((stock) => {
        priceMap[stock.symbol] = stock.price
      })
      setCurrentPrices(priceMap)
      setStocks(allStocks)
    } catch (error) {
      console.error('Error loading stocks:', error)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const allStocks = generateAllStocksData()
      const priceMap = {}
      allStocks.forEach((stock) => {
        priceMap[stock.symbol] = stock.price
      })
      setCurrentPrices(priceMap)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (positions.length > 0) {
      const history = generatePortfolioHistoryData(positions, currentPrices, 30)
      setPortfolioHistory(history)
    }
  }, [positions, currentPrices])

  const totalValue = calculatePortfolioValue(positions, currentPrices)
  const totalCost = calculatePortfolioCost(positions)
  const gainLoss = calculatePortfolioGainLoss(positions, currentPrices)
  const returnPercent = calculatePortfolioReturn(positions, currentPrices)
  const dailyChange = Math.random() * 5000 - 2500

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Portfolio</h1>
          <p className="text-text-tertiary">Manage your investment positions</p>
        </div>

        <PortfolioSummary totalValue={totalValue} totalCost={totalCost} gainLoss={gainLoss} returnPercent={returnPercent} dailyChange={dailyChange} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PortfolioChart data={portfolioHistory} />
          </div>
          <AssetAllocation positions={positions} currentPrices={currentPrices} />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-text-primary font-semibold text-lg">Positions</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg transition"
            >
              <Plus size={18} />
              Add Position
            </button>
          </div>
          <HoldingsTable
            positions={positions}
            currentPrices={currentPrices}
            onEdit={(pos) => console.log('Edit:', pos)}
            onDelete={deletePosition}
          />
        </div>

        <PortfolioMetrics sharpeRatio={1.25} beta={1.08} volatility={0.18} />

        <TransactionHistory transactions={transactions} />

        <AddPositionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addPosition} stocks={stocks} />
      </div>
    </div>
  )
}
