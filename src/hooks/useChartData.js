import { useState, useEffect } from 'react'

export const useChartData = (basePrice, timeframe = '1D') => {
  const [data, setData] = useState([])

  useEffect(() => {
    const generateChartData = () => {
      const data = []
      const today = new Date()
      let days = 1

      switch (timeframe) {
        case '1D':
          days = 1
          break
        case '1W':
          days = 7
          break
        case '1M':
          days = 30
          break
        case '3M':
          days = 90
          break
        case '1Y':
          days = 252 // trading days
          break
        case 'ALL':
          days = 365 * 2
          break
        default:
          days = 30
      }

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        const volatility = 0.02 + Math.random() * 0.03
        const change = (Math.random() - 0.5) * 2
        const dayVariance = basePrice * volatility

        const open = basePrice + (Math.random() - 0.5) * dayVariance
        const close = open + change * dayVariance
        const high = Math.max(open, close) + Math.random() * dayVariance * 0.5
        const low = Math.min(open, close) - Math.random() * dayVariance * 0.5
        const volume = Math.floor(Math.random() * 100000000) + 10000000

        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dateObj: date,
          open: parseFloat(open.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          volume,
          price: parseFloat(close.toFixed(2)),
        })
      }

      setData(data)
    }

    generateChartData()
  }, [basePrice, timeframe])

  return data
}
