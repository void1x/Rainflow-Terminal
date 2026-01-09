import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
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
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import PrivateRoute from './components/auth/PrivateRoute'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE'

function ProtectedLayout() {
  return (
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
  )
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <PortfolioProvider>
          <WatchlistProvider>
            <AlertsProvider>
              <NotificationProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/*"
                      element={
                        <PrivateRoute>
                          <ProtectedLayout />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Router>
              </NotificationProvider>
            </AlertsProvider>
          </WatchlistProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}
