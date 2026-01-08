export const generateOHLCData = (basePrice, days = 30, volatility = 0.02) => {
  const data = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const dailyChange = (Math.random() - 0.5) * 2 * volatility * basePrice
    const open = basePrice + (Math.random() - 0.5) * dailyChange
    const close = open + (Math.random() - 0.5) * dailyChange
    const high = Math.max(open, close) + Math.random() * Math.abs(dailyChange) * 0.5
    const low = Math.min(open, close) - Math.random() * Math.abs(dailyChange) * 0.5
    const volume = Math.floor(Math.random() * 100000000) + 10000000

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dateObj: date,
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume,
    })

    basePrice = close
  }

  return data
}

export const generatePortfolioHistoryData = (positions, currentPrices, daysBack = 30) => {
  const data = []
  const today = new Date()

  for (let i = daysBack - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    let totalValue = 0
    positions.forEach((position) => {
      const volatility = (Math.random() - 0.5) * 0.05
      const price = (currentPrices[position.symbol] || 0) * (1 + volatility)
      totalValue += position.shares * price
    })

    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(totalValue.toFixed(2)),
    })
  }

  return data
}

export const generateAssetAllocationData = (positions, currentPrices) => {
  const data = []
  const totalValue = positions.reduce((sum, pos) => {
    return sum + pos.shares * (currentPrices[pos.symbol] || 0)
  }, 0)

  positions.forEach((position) => {
    const value = position.shares * (currentPrices[position.symbol] || 0)
    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0

    data.push({
      name: position.symbol,
      value: parseFloat(value.toFixed(2)),
      percentage: parseFloat(percentage.toFixed(2)),
    })
  })

  return data.sort((a, b) => b.percentage - a.percentage)
}

export const generateVolumeData = (ohlcData) => {
  return ohlcData.map((item) => ({
    date: item.date,
    volume: item.volume,
  }))
}
