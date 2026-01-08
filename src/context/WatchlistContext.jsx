import { createContext, useState, useEffect } from 'react'

export const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('watchlist')
    if (saved) {
      setWatchlist(JSON.parse(saved))
    } else {
      const defaultWatchlist = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']
      setWatchlist(defaultWatchlist)
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol])
    }
  }

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((s) => s !== symbol))
  }

  const isInWatchlist = (symbol) => {
    return watchlist.includes(symbol)
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}
