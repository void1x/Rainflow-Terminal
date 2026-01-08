import { useState, useMemo } from 'react'
import { generateMockNews } from '../../data/mockNews'
import { generateAllStocksData } from '../../data/mockData'
import NewsCard from './NewsCard'
import NewsFilters from './NewsFilters'
import NewsDetail from './NewsDetail'

export default function NewsPage() {
  const [news] = useState(generateMockNews())
  const [stocks] = useState(generateAllStocksData())
  const [filters, setFilters] = useState({ search: '', symbol: '', sentiment: '' })
  const [selectedArticle, setSelectedArticle] = useState(null)

  const filteredNews = useMemo(() => {
    return news.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.content.toLowerCase().includes(filters.search.toLowerCase())
      const matchesSymbol = !filters.symbol || article.symbol === filters.symbol
      const matchesSentiment = !filters.sentiment || article.sentiment === filters.sentiment

      return matchesSearch && matchesSymbol && matchesSentiment
    })
  }, [news, filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">Market News</h1>
          <p className="text-text-tertiary">Stay updated with latest market insights</p>
        </div>

        <NewsFilters onFilterChange={handleFilterChange} stocks={stocks} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="text-text-secondary text-sm mb-4">
              Showing {filteredNews.length} of {news.length} articles
            </div>
            <div className="space-y-4">
              {filteredNews.map((article) => (
                <NewsCard key={article.id} article={article} onSelect={setSelectedArticle} />
              ))}
            </div>
          </div>

          <div>
            {selectedArticle && <NewsDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
          </div>
        </div>
      </div>
    </div>
  )
}
