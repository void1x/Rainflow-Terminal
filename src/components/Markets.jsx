import { generateAllStocksData } from '../data/mockData'
import StockCard from './StockCard'
import { Globe } from 'lucide-react'

export default function Markets() {
  const stocks = generateAllStocksData()

  return (
    <div className="flex-1 overflow-auto bg-bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-info bg-opacity-10 rounded-lg">
              <Globe size={24} className="text-info" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Market Overview</h1>
          </div>
          <p className="text-text-tertiary text-sm">Browse all available stocks and market data</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  )
}
