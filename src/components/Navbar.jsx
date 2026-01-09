import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, TrendingUp, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/stock/AAPL', label: 'Stock Detail' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/alerts', label: 'Alerts' },
    { path: '/news', label: 'News' },
    { path: '/screener', label: 'Screener' },
    { path: '/markets', label: 'Markets' },
    { path: '/settings', label: 'Settings' },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="bg-surface border-b border-border-color sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:shadow-lg transition">
              <TrendingUp size={24} className="text-white" />
            </div>
            <span className="text-text-primary font-bold text-xl hidden sm:inline">RainFlow Terminal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover transition text-text-primary"
            >
              <User size={20} />
              <span className="hidden sm:inline text-sm font-medium truncate max-w-[150px]">
                {user?.name || user?.email || 'User'}
              </span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-surface border border-border-color rounded-lg shadow-lg z-50">
                {user?.picture && (
                  <div className="p-4 border-b border-border-color flex items-center gap-3">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-medium truncate">{user.name}</p>
                      <p className="text-text-secondary text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setShowUserMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition text-sm"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-text-primary hover:text-primary transition ml-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border-color pt-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
