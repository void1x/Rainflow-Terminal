import { RotateCcw } from 'lucide-react'

export default function ScreenerFilters({ filters, onFilterChange, onReset }) {
  const handleRangeChange = (key, value) => {
    onFilterChange(key, value)
  }

  return (
    <div className="card p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-text-primary font-semibold">Filters</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-primary hover:text-opacity-80 text-sm transition"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Price Range</label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) => handleRangeChange('priceMin', e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) => handleRangeChange('priceMax', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Volume (Millions)</label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.volumeMin}
              onChange={(e) => handleRangeChange('volumeMin', e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.volumeMax}
              onChange={(e) => handleRangeChange('volumeMax', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Change %</label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.changeMin}
              onChange={(e) => handleRangeChange('changeMin', e.target.value)}
              step="0.1"
              className="w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.changeMax}
              onChange={(e) => handleRangeChange('changeMax', e.target.value)}
              step="0.1"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Market Cap ($B)</label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.marketCapMin}
              onChange={(e) => handleRangeChange('marketCapMin', e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.marketCapMax}
              onChange={(e) => handleRangeChange('marketCapMax', e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
