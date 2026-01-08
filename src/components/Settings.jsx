import { useState, useContext, useEffect } from 'react'
import { Settings as SettingsIcon, Bell, Palette, Lock } from 'lucide-react'
import { ThemeContext } from '../context/ThemeContext'

export default function Settings() {
  const { isDark, toggleTheme } = useContext(ThemeContext) || { isDark: true, toggleTheme: () => {} }
  const [compactView, setCompactView] = useState(() => {
    const saved = localStorage.getItem('compactView')
    return saved !== null ? JSON.parse(saved) : false
  })
  const [priceAlerts, setPriceAlerts] = useState(() => {
    const saved = localStorage.getItem('priceAlerts')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [newsNotifications, setNewsNotifications] = useState(() => {
    const saved = localStorage.getItem('newsNotifications')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [portfolioUpdates, setPortfolioUpdates] = useState(() => {
    const saved = localStorage.getItem('portfolioUpdates')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [savedMessage, setSavedMessage] = useState(false)

  // Save all settings to localStorage
  useEffect(() => {
    localStorage.setItem('compactView', JSON.stringify(compactView))
    localStorage.setItem('priceAlerts', JSON.stringify(priceAlerts))
    localStorage.setItem('newsNotifications', JSON.stringify(newsNotifications))
    localStorage.setItem('portfolioUpdates', JSON.stringify(portfolioUpdates))
  }, [compactView, priceAlerts, newsNotifications, portfolioUpdates])

  const handleSaveChanges = () => {
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  const handleReset = () => {
    setCompactView(false)
    setPriceAlerts(true)
    setNewsNotifications(true)
    setPortfolioUpdates(true)
    setSavedMessage(false)
  }

  return (
    <div className="flex-1 overflow-auto bg-bg-primary p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
              <SettingsIcon size={24} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          </div>
          <p className="text-text-tertiary text-sm">Manage your preferences and account settings</p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-success bg-opacity-10 border border-success rounded-lg">
            <p className="text-success font-medium">✓ Settings saved successfully</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary bg-opacity-10 rounded-lg">
                <Palette size={20} className="text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <div>
                  <label className="text-text-primary font-medium block">Dark Mode</label>
                  <p className="text-text-tertiary text-sm">Use dark theme (recommended)</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isDark}
                  onChange={() => {
                    toggleTheme()
                    setSavedMessage(true)
                    setTimeout(() => setSavedMessage(false), 2000)
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <div>
                  <label className="text-text-primary font-medium block">Compact View</label>
                  <p className="text-text-tertiary text-sm">Reduce spacing and padding</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={compactView}
                  onChange={(e) => setCompactView(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-info bg-opacity-10 rounded-lg">
                <Bell size={20} className="text-info" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <div>
                  <label className="text-text-primary font-medium block">Price Alerts</label>
                  <p className="text-text-tertiary text-sm">Get notified when prices change</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={priceAlerts}
                  onChange={(e) => setPriceAlerts(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <div>
                  <label className="text-text-primary font-medium block">Market News</label>
                  <p className="text-text-tertiary text-sm">Receive market news updates</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={newsNotifications}
                  onChange={(e) => setNewsNotifications(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-surface rounded-lg hover:bg-surface-hover transition">
                <div>
                  <label className="text-text-primary font-medium block">Portfolio Updates</label>
                  <p className="text-text-tertiary text-sm">Get portfolio performance updates</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={portfolioUpdates}
                  onChange={(e) => setPortfolioUpdates(e.target.checked)}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-success bg-opacity-10 rounded-lg">
                <Lock size={20} className="text-success" />
              </div>
              <h2 className="text-lg font-semibold text-text-primary">Security</h2>
            </div>
            <button className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg transition">
              Change Password
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleSaveChanges}
              className="flex-1 bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg transition"
            >
              Save Changes
            </button>
            <button 
              onClick={handleReset}
              className="flex-1 bg-surface hover:bg-surface-hover text-text-primary font-medium py-3 rounded-lg border border-border-color transition"
            >
              Reset to Defaults
            </button>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-info bg-opacity-10 border border-info rounded-lg">
            <p className="text-info text-sm">
              ℹ️ <strong>Note:</strong> All settings are automatically saved to your browser's local storage. 
              Dark mode changes apply immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
