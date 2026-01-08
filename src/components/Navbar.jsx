import { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { generateAllStocksData } from '../data/mockData'

export default function Navbar() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const allStocks = generateAllStocksData()

  const handleSearch = (e) => {
    const query = e.target.value.toUpperCase()
    setSearchQuery(query)

    if (query.length > 0) {
      const results = allStocks.filter((stock) => stock.symbol.includes(query) || stock.name.toUpperCase().includes(query))
      setSearchResults(results.slice(0, 5))
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  return (
    <div className="bg-surface border-b border-border-color px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-info to-success rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">RainFlow</h1>
            <p className="text-xs text-text-tertiary">Terminal</p>
          </div>
        </div>

        <div className="relative flex-1 max-w-md mx-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
            <input
              type="text"
              placeholder="Search stocks, symbols..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.length > 0 && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full bg-bg-secondary border border-border-color rounded-lg pl-10 pr-4 py-2.5 text-text-primary text-sm focus:ring-2 focus:ring-primary"
            />
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-surface border border-border-color rounded-lg mt-2 z-50 shadow-lg overflow-hidden">
              {searchResults.map((stock) => (
                <div key={stock.symbol} className="px-4 py-3 hover:bg-surface-hover cursor-pointer border-b border-border-color last:border-b-0 flex justify-between items-center transition-colors">
                  <div>
                    <div className="text-text-primary font-semibold text-sm">{stock.symbol}</div>
                    <div className="text-text-tertiary text-xs mt-0.5">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-text-primary font-semibold text-sm">${stock.price.toFixed(2)}</div>
                    <div className={`text-xs font-medium ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-8">
          <Link to="/" className={`font-medium text-sm transition-colors ${location.pathname === '/' ? 'text-text-primary border-b-2 border-primary pb-0.5' : 'text-text-secondary hover:text-text-primary'}`}>
            Dashboard
          </Link>
          <Link to="/markets" className={`font-medium text-sm transition-colors ${location.pathname === '/markets' ? 'text-text-primary border-b-2 border-primary pb-0.5' : 'text-text-secondary hover:text-text-primary'}`}>
            Markets
          </Link>
          <Link to="/settings" className={`font-medium text-sm transition-colors ${location.pathname === '/settings' ? 'text-text-primary border-b-2 border-primary pb-0.5' : 'text-text-secondary hover:text-text-primary'}`}>
            Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
