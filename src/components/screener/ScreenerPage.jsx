import { useState, useMemo } from 'react'
import { generateAllStocksData } from '../../data/mockData'
import ScreenerFilters from './ScreenerFilters'
import ScreenerResults from './ScreenerResults'

export default function ScreenerPage() {
  const [stocks] = useState(generateAllStocksData())
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    volumeMin: '',
    volumeMax: '',
    changeMin: '',
    changeMax: '',
    marketCapMin: '',
    marketCapMax: '',
  })
  const [sortBy, setSortBy] = useState({ field: 'symbol', direction: 'asc' })

  const filteredAndSorted = useMemo(() => {
    let filtered = stocks.filter((stock) => {
      if (filters.priceMin && stock.price < parseFloat(filters.priceMin)) return false
      if (filters.priceMax && stock.price > parseFloat(filters.priceMax)) return false
      if (filters.volumeMin && stock.volume < parseFloat(filters.volumeMin) * 1e6) return false
      if (filters.volumeMax && stock.volume > parseFloat(filters.volumeMax) * 1e6) return false
      if (filters.changeMin && stock.changePercent < parseFloat(filters.changeMin)) return false
      if (filters.changeMax && stock.changePercent > parseFloat(filters.changeMax)) return false
      return true
    })

    filtered.sort((a, b) => {
      let aVal = a[sortBy.field]
      let bVal = b[sortBy.field]

      if (sortBy.direction === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    return filtered
  }, [stocks, filters, sortBy])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleReset = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      volumeMin: '',
      volumeMax: '',
      changeMin: '',
      changeMax: '',
      marketCapMin: '',
      marketCapMax: '',
    })
  }

  const handleSort = (field) => {
    if (sortBy.field === field) {
      setSortBy((prev) => ({
        ...prev,
        direction: prev.direction === 'asc' ? 'desc' : 'asc',
      }))
    } else {
      setSortBy({ field, direction: 'asc' })
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Stock Screener</h1>
          <p className="text-text-tertiary">Find stocks that match your criteria</p>
        </div>

        <ScreenerFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleReset} />

        <ScreenerResults results={filteredAndSorted} sortBy={sortBy} onSort={handleSort} />
      </div>
    </div>
  )
}
