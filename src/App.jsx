import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { WatchlistProvider } from './context/WatchlistContext'
import { AlertsProvider } from './context/AlertsContext'
import { ThemeProvider } from './context/ThemeContext'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Markets from './components/Markets'
import Settings from './components/Settings'
import StockDetail from './components/StockDetail'
import PortfolioPage from './components/portfolio/PortfolioPage'
import AlertsPage from './components/alerts/AlertsPage'
import NewsPage from './components/news/NewsPage'
import ScreenerPage from './components/screener/ScreenerPage'

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <WatchlistProvider>
          <AlertsProvider>
            <NotificationProvider>
              <Router>
                <div className="w-full h-screen bg-bg-primary flex flex-col">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/stock/:symbol" element={<StockDetail />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/watchlist" element={<Markets />} />
                    <Route path="/alerts" element={<AlertsPage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/screener" element={<ScreenerPage />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </Router>
            </NotificationProvider>
          </AlertsProvider>
        </WatchlistProvider>
      </PortfolioProvider>
    </ThemeProvider>
  )
}
