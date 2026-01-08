import { useState, useEffect } from 'react'
import MarketOverview from './MarketOverview'
import StockChart from './StockChart'
import Portfolio from './Portfolio'
import Watchlist from './Watchlist'
import { generateAllStocksData } from '../data/mockData'

export default function Dashboard() {
  const [stocks, setStocks] = useState([])
  const [selectedStock, setSelectedStock] = useState('AAPL')

  useEffect(() => {
    setStocks(generateAllStocksData())
  }, [])

  return (
    <div className="flex-1 overflow-auto bg-bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        <MarketOverview />

        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="col-span-2">
            {selectedStock && <StockChart symbol={selectedStock} />}
          </div>

          <div className="space-y-8">
            <Portfolio stocks={stocks} />
            <Watchlist onStockSelect={setSelectedStock} />
          </div>
        </div>
      </div>
    </div>
  )
}
