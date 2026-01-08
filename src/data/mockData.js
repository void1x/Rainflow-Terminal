const stocksData = {
  AAPL: { name: 'Apple Inc.', basePrice: 192.50 },
  MSFT: { name: 'Microsoft Corp.', basePrice: 378.85 },
  GOOGL: { name: 'Alphabet Inc.', basePrice: 139.60 },
  AMZN: { name: 'Amazon.com Inc.', basePrice: 181.34 },
  TSLA: { name: 'Tesla Inc.', basePrice: 243.80 },
  META: { name: 'Meta Platforms', basePrice: 475.85 },
  NVDA: { name: 'NVIDIA Corp.', basePrice: 875.29 },
  JPM: { name: 'JPMorgan Chase', basePrice: 207.40 },
}

export const generateHistoricalData = (basePrice) => {
  const data = []
  const today = new Date()
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const variance = (Math.random() - 0.5) * 10
    const price = basePrice + variance
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
    })
  }
  
  return data
}

export const marketIndices = [
  { symbol: '^GSPC', name: 'S&P 500', price: 5123.45, change: 145.67, changePercent: 2.92 },
  { symbol: '^IXIC', name: 'NASDAQ', price: 16089.62, change: 523.45, changePercent: 3.36 },
  { symbol: '^DJI', name: 'DOW JONES', price: 39845.33, change: 234.56, changePercent: 0.59 },
]

export const generateAllStocksData = () => {
  const stocks = []
  Object.entries(stocksData).forEach(([symbol, data]) => {
    const variance = (Math.random() - 0.5) * 20
    const currentPrice = data.basePrice + variance
    const change = variance
    const changePercent = (variance / data.basePrice) * 100
    
    stocks.push({
      symbol,
      name: data.name,
      price: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 100000000) + 5000000,
    })
  })
  return stocks
}

export const getTopGainers = (stocks) => {
  return stocks.sort((a, b) => b.changePercent - a.changePercent).slice(0, 5)
}

export const getTopLosers = (stocks) => {
  return stocks.sort((a, b) => a.changePercent - b.changePercent).slice(0, 5)
}

export const generatePortfolio = () => {
  return [
    { symbol: 'AAPL', shares: 50, avgCost: 175.00 },
    { symbol: 'MSFT', shares: 30, avgCost: 320.00 },
    { symbol: 'GOOGL', shares: 100, avgCost: 120.00 },
    { symbol: 'TSLA', shares: 25, avgCost: 200.00 },
    { symbol: 'NVDA', shares: 20, avgCost: 650.00 },
  ]
}

export const generateWatchlist = () => {
  const watchlistSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']
  return watchlistSymbols.map((symbol) => {
    const data = stocksData[symbol]
    const variance = (Math.random() - 0.5) * 15
    const currentPrice = data.basePrice + variance
    const change = variance
    const changePercent = (variance / data.basePrice) * 100
    
    return {
      symbol,
      name: data.name,
      price: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
    }
  })
}

export const getStockData = (symbol) => {
  return stocksData[symbol] || null
}
