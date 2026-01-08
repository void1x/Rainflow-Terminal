import { useState, useEffect } from 'react'

export const useRealtimePrice = (basePrice) => {
  const [price, setPrice] = useState(basePrice)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice((prevPrice) => {
        const change = (Math.random() - 0.5) * 2
        return parseFloat((prevPrice + change).toFixed(2))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const change = price - basePrice
  const changePercent = (change / basePrice) * 100

  return { price, change: parseFloat(change.toFixed(2)), changePercent: parseFloat(changePercent.toFixed(2)) }
}
