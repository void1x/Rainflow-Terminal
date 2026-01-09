# RainFlow Terminal

A comprehensive Bloomberg Terminal-inspired financial dashboard built with React, featuring advanced charting, portfolio management, price alerts, news feed, and stock screener. Real-time stock market data visualization with a professional dark-themed user interface and full light/dark mode support.

![RainFlow Terminal](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?logo=tailwindcss)
![Recharts](https://img.shields.io/badge/Recharts-2.10-8884d8)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:5173/
```

---

## ✨ Key Features

### 📊 Stock Charting
- Interactive line charts with Recharts
- 6 time range selectors (1D, 1W, 1M, 3M, 1Y, ALL)
- Real-time price updates every 3 seconds
- Responsive chart container with proper sizing
- Support for historical data generation

### 💼 Portfolio Management
- Track multiple stock positions
- Real-time portfolio valuation
- Add, edit, and delete positions
- Transaction history tracking
- Asset allocation visualization
- Portfolio performance metrics
- Persistent storage via localStorage

### 🔔 Price Alerts System
- Create custom price alerts
- Alert conditions (above/below threshold)
- Real-time price monitoring
- Toast notifications when triggered
- Alert status tracking (active, triggered, expired)
- Expiration date management

### 📰 Market News Feed
- 22+ pre-loaded news articles
- Sentiment analysis (Bullish, Neutral, Bearish)
- Multi-filter search capabilities
- News card display with key information
- Expandable article details
- Source attribution

### 🔍 Stock Screener
- Multi-criteria filtering (price, volume, market cap, change %)
- Sortable results table
- Real-time stock data
- Quick navigation to stock details
- Reset filter functionality

### 👁️ Watchlist Management
- Quick access to favorite stocks
- Live price and change updates
- Easy add/remove functionality
- Persistent storage

### 🎨 Professional UI
- Bloomberg-inspired dark theme
- Full light/dark mode support with CSS variables
- Responsive design (desktop, tablet, mobile)
- Smooth transitions and animations
- Custom scrollbar styling
- Color-coded gains/losses (green/red)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── charts/                      # Chart components (6 files)
│   │   ├── AdvancedStockChart.jsx   # Main chart component
│   │   ├── CandlestickChart.jsx     # OHLC candlestick chart
│   │   ├── TimeframeSelector.jsx    # Time range selector
│   │   ├── VolumeChart.jsx          # Volume visualization
│   │   ├── TechnicalIndicators.jsx  # Indicator toggles
│   │   └── ChartControls.jsx        # Zoom/pan controls
│   ├── portfolio/                   # Portfolio components (8 files)
│   │   ├── PortfolioPage.jsx        # Main portfolio view
│   │   ├── PortfolioSummary.jsx     # Summary stats
│   │   ├── HoldingsTable.jsx        # Holdings display
│   │   ├── AssetAllocation.jsx      # Allocation chart
│   │   ├── PortfolioChart.jsx       # Performance chart
│   │   ├── AddPositionModal.jsx     # Add position form
│   │   ├── TransactionHistory.jsx   # Transaction log
│   │   └── PortfolioMetrics.jsx     # Risk metrics
│   ├── alerts/                      # Alert components (5 files)
│   │   ├── AlertsPage.jsx           # Alert management page
│   │   ├── AlertCard.jsx            # Individual alert display
│   │   ├── CreateAlertModal.jsx     # Alert creation form
│   │   ├── AlertNotification.jsx    # Toast notification
│   │   └── AlertBadge.jsx           # Alert status badge
│   ├── news/                        # News components (5 files)
│   │   ├── NewsPage.jsx             # News feed page
│   │   ├── NewsCard.jsx             # News card display
│   │   ├── NewsFilters.jsx          # Search/filter controls
│   │   ├── NewsDetail.jsx           # Full article view
│   │   └── SentimentBadge.jsx       # Sentiment indicator
│   ├── screener/                    # Screener components (3 files)
│   │   ├── ScreenerPage.jsx         # Main screener page
│   │   ├── ScreenerFilters.jsx      # Filter controls
│   │   └── ScreenerResults.jsx      # Results table
│   ├── Navbar.jsx                   # Navigation bar
│   ├── Dashboard.jsx                # Home dashboard
│   ├── Markets.jsx                  # Markets view
│   ├── StockDetail.jsx              # Stock detail page
│   ├── StockChart.jsx               # Stock chart component
│   ├── StockCard.jsx                # Stock card display
│   ├── Watchlist.jsx                # Watchlist page
│   ├── Portfolio.jsx                # Legacy portfolio
│   ├── Settings.jsx                 # User settings
│   ├── MarketOverview.jsx           # Market overview
│   └── App.jsx                      # Root component
│
├── context/                         # State management (5 providers)
│   ├── ThemeContext.jsx             # Dark/light mode provider
│   ├── PortfolioContext.jsx         # Portfolio state
│   ├── AlertsContext.jsx            # Alerts state
│   ├── WatchlistContext.jsx         # Watchlist state
│   └── NotificationContext.jsx      # Notification state
│
├── hooks/                           # Custom hooks (6 hooks)
│   ├── useRealtimePrice.js          # Real-time price updates
│   ├── usePortfolio.js              # Portfolio logic
│   ├── useWatchlist.js              # Watchlist logic
│   ├── useAlerts.js                 # Alert management
│   ├── useChartData.js              # Chart data handling
│   └── useNotifications.js          # Notification management
│
├── utils/                           # Utility functions
│   ├── calculations.js              # Financial calculations (Sharpe Ratio, Beta, etc.)
│   ├── formatters.js                # Data formatting functions
│   └── chartConfig.js               # Chart configuration constants
│
├── data/                            # Mock data generators
│   ├── mockData.js                  # Stock and company data
│   ├── mockNews.js                  # News articles
│   ├── technicalIndicators.js       # Technical indicator calculations
│   └── chartDataGenerators.js       # Historical data generation
│
├── App.jsx                          # Main app component with routing
├── main.jsx                         # React entry point
└── index.css                        # Global styles with CSS variables
```

---

## 🛣️ Application Routes

| Route | Feature | Description |
|-------|---------|-------------|
| `/login` | Login | Sign in with email or Google OAuth |
| `/signup` | Sign Up | Create account with email or Google OAuth |
| `/` | Dashboard | Markets overview with key insights |
| `/stock/:symbol` | Stock Details | Advanced charts and real-time data |
| `/portfolio` | Portfolio | Position management and metrics |
| `/watchlist` | Watchlist | Monitor favorite stocks |
| `/alerts` | Alerts | Price alert management system |
| `/news` | News Feed | Market intelligence and sentiment analysis |
| `/screener` | Screener | Stock filtering and analysis |
| `/markets` | Markets | Market overview with watchlist |
| `/settings` | Settings | User preferences including theme |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router | 6.20.0 | Client-side routing |
| @react-oauth/google | Latest | Google OAuth authentication |
| Vite | 7.3.1 | Build tool & dev server |
| TailwindCSS | 3.3.6 | Utility-first CSS framework |
| Recharts | 2.10.3 | Charts & graphs library |
| Lucide React | 0.294.0 | Icon library |
| PostCSS | 8.4.32 | CSS transformation tool |
| Autoprefixer | 10.4.16 | CSS vendor prefixes |

---

## 📦 Installation

### Prerequisites
- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Setup Steps

1. **Navigate to Project Directory**
```bash
cd c:\Users\rain\Rainflow-Terminal
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Google OAuth** (Optional but recommended)
   - Get your Google Client ID from [Google Cloud Console](https://console.cloud.google.com/)
   - Create `.env.local` file:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id_here
   ```
   - See [AUTH_SETUP.md](./AUTH_SETUP.md) for detailed instructions

4. **Start Development Server**
```bash
npm run dev
```

5. **Open in Browser**
Navigate to `http://localhost:5173/` (redirects to login page)

---

## 🚀 Available Scripts

```bash
# Development server with hot module replacement
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Theme System

### Dark/Light Mode
The application features a comprehensive theme system using CSS variables that dynamically update based on user preference.

**Files involved:**
- `src/context/ThemeContext.jsx` - Theme state management
- `src/index.css` - CSS variable definitions
- `tailwind.config.js` - Tailwind color configuration

### Color Palette

**Dark Mode (Default)**
- **Primary Background**: #0a0e27
- **Secondary Background**: #101430
- **Surface**: #1a202c
- **Text Primary**: #f7fafc
- **Text Secondary**: #cbd5e0
- **Border**: #2d3748

**Light Mode**
- **Primary Background**: #f8f9fa
- **Secondary Background**: #e9ecef
- **Surface**: #ffffff
- **Text Primary**: #1a202c
- **Text Secondary**: #495057
- **Border**: #dee2e6

**Status Colors**
- **Success**: #10b981 (Green)
- **Danger**: #ef4444 (Red)
- **Warning**: #f59e0b (Amber)
- **Info**: #3b82f6 (Blue)
- **Primary**: #6366f1 (Indigo)

### Design Features
- Professional dark theme inspired by Bloomberg Terminal
- Responsive design for all screen sizes
- Smooth transitions and animations
- Consistent typography hierarchy
- Accessibility-focused color contrasts
- Custom scrollbar styling
- Optimized hover and focus states

---

## 📊 Default Sample Data

### Pre-loaded Stocks
- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corp.
- **GOOGL** - Alphabet Inc.
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **META** - Meta Platforms
- **NVDA** - NVIDIA Corp.
- **JPM** - JPMorgan Chase

### Initial Portfolio Positions
- 50 shares of AAPL @ $175.00
- 30 shares of MSFT @ $320.00
- 100 shares of GOOGL @ $120.00
- 25 shares of TSLA @ $200.00
- 20 shares of NVDA @ $650.00

---

## 💻 Usage Examples

### View Stock Chart
1. Navigate to `/stock/AAPL` or click "Stock Detail" in navbar
2. View the interactive stock chart
3. Select different time ranges using the range selector
4. Watch real-time price updates

### Create Portfolio Position
1. Go to `/portfolio`
2. Click "Add Position" button
3. Enter: Stock Symbol, Number of Shares, Purchase Price, Date
4. Click "Add Position"
5. View updated portfolio metrics

### Set Price Alert
1. Navigate to `/alerts`
2. Click "New Alert" button
3. Configure: Stock Symbol, Condition (above/below), Price, Expiry Date
4. Receive notification when price triggers alert

### Search Stocks
1. Go to `/screener`
2. Apply filters (price range, volume, market cap, change %)
3. Click column headers to sort
4. Click "View" to see stock details

---

## 🔧 Customization

### Add New Stock
**File**: `src/data/mockData.js`
```javascript
SYMBOL: { 
  name: 'Company Name', 
  basePrice: 100.00 
}
```

### Change Theme Colors
**File**: `src/index.css`
Update the CSS variables in `:root` or `html[data-theme="light"]` selectors.

### Modify Update Frequency
**File**: `src/hooks/useRealtimePrice.js`
```javascript
setInterval(() => { ... }, 3000)  // Change 3000 to desired milliseconds
```

### Adjust Chart Height
**File**: `src/components/StockChart.jsx`
```javascript
<div style={{ width: '100%', height: '400px' }}>
```

---

## 📈 Performance

- ⚡ **Dev Server**: Starts in ~2 seconds
- 📦 **Production Bundle**: ~500KB (minified + gzipped)
- 🎯 **Initial Load**: <1 second
- 💾 **Memory**: ~50MB at runtime
- 🔄 **Price Update Interval**: 3 seconds (configurable)

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| IE 11 | All | ❌ Not Supported |

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy
The `/dist` folder contains the production-ready application. Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**: Push to `gh-pages` branch
- **Traditional Hosting**: Upload `/dist` folder via FTP/SFTP

### Server Configuration
For single-page application routing, configure server to serve `index.html`:

**Nginx**
```nginx
try_files $uri $uri/ /index.html;
```

**Apache**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📚 Context API

### ThemeContext
Manages dark/light mode theme switching and persists preference to localStorage.

**Providers Functions:**
- `isDark` - Current theme state
- `toggleTheme()` - Switch between themes

### PortfolioContext
Manages user's stock positions, transactions, and portfolio calculations.

**Available Methods:**
- `addPosition()` - Add new stock position
- `updatePosition()` - Modify position details
- `removePosition()` - Delete a position
- `addTransaction()` - Log buy/sell transactions

### AlertsContext
Manages price alert creation, monitoring, and notifications.

**Available Methods:**
- `createAlert()` - Create new price alert
- `deleteAlert()` - Remove an alert
- `updateAlertStatus()` - Update alert status

### WatchlistContext
Manages user's watchlist of favorite stocks.

**Available Methods:**
- `addToWatchlist()` - Add stock to watchlist
- `removeFromWatchlist()` - Remove stock
- `getWatchlist()` - Retrieve all watchlist items

### NotificationContext
Manages toast notifications across the application.

**Available Methods:**
- `showNotification()` - Display notification

---

## 🔐 Authentication

The application includes a complete authentication system:

### Features
- **Email/Password Authentication**: Local account creation and login
- **Google OAuth**: One-click sign-in with Google
- **Protected Routes**: Dashboard and all features require authentication
- **User Profile**: Display user information from Google or email signup
- **Secure Logout**: Sign out button in navbar

### Setup
See [AUTH_SETUP.md](./AUTH_SETUP.md) for complete Google OAuth configuration guide.

---

## 🔮 Future Enhancements

- [ ] Real API integration (Alpha Vantage, Finnhub, etc.)
- [ ] WebSocket for real-time data streaming
- [ ] Backend authentication server
- [ ] User profiles and preferences
- [ ] Advanced technical analysis indicators
- [ ] Options and derivatives trading
- [ ] Backtesting engine for strategies
- [ ] Mobile app (React Native)
- [ ] Social trading and social feeds
- [ ] Machine learning price predictions
- [ ] Custom technical indicators builder
- [ ] Email verification and password reset
- [ ] Two-factor authentication (2FA)
- [ ] GitHub OAuth integration
- [ ] Session management and auto-logout

---

## 📊 Project Statistics

| Metric | Count |
|--------|-------|
| React Components | 40+ |
| Custom Hooks | 6 |
| Context Providers | 5 |
| Routes | 9 |
| Stock Symbols | 8+ |
| News Articles | 22+ |
| Files | 50+ |
| Lines of Code | 3000+ |

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this project and submit pull requests.

## 📄 License

This project is open source and available under the **MIT License**.

## 👨‍💻 Author

**void1x** - [GitHub](https://github.com/void1x)

## 🙏 Acknowledgments

- Inspired by Bloomberg Terminal
- Built with React ecosystem
- Styled with TailwindCSS
- Icons from Lucide React
- Charts powered by Recharts
- Fonts from Google Fonts

---

## 📞 Support & Help

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check the `/src` structure for component examples
- Review context providers for state management patterns
- Inspect browser console (F12) for error messages

---

## ⚠️ Important Notes

### Demo Application
This is a **demo application** with simulated market data. Price movements are generated algorithmically to simulate real trading conditions.

### For Production Use
To integrate real market data, connect to:
- **Alpha Vantage** (free tier: 5 requests/min)
- **Finnhub** (free tier available)
- **Polygon.io** (free tier available)
- **Yahoo Finance API**
- **IEX Cloud**

### Authentication Security Notes
⚠️ **Development Only**: The current implementation stores user data in **localStorage** for demo purposes.

For **production**:
1. Implement a proper backend API with authentication
2. Use secure HTTP-only cookies for tokens
3. Never store sensitive data in localStorage
4. Implement JWT token validation on the server
5. Add CSRF protection
6. Use HTTPS only
7. Implement rate limiting on auth endpoints
8. Add email verification
9. Implement secure password hashing (bcrypt/argon2)
10. Add session management with auto-logout

### Data Storage
All user data is persisted in browser **localStorage**:
- User authentication (email, name, profile picture)
- Portfolio positions
- Watchlist items
- Price alerts
- Theme preferences
- Transaction history

To reset data: Open DevTools (F12) → Application → Local Storage → Clear All

---

## 🎯 Version Info

- **App Version**: 0.0.1
- **React**: 18.2.0
- **Vite**: 7.3.1
- **Node**: 18.0.0+ required
- **npm**: 9.0.0+ required

---

## 🚀 Getting Started Now

```bash
# Clone the repository
git clone https://github.com/void1x/Rainflow-Terminal.git

# Navigate to project
cd Rainflow-Terminal

# Install and run
npm install && npm run dev

# Open in browser
# http://localhost:5173/
```

**Happy Trading!** 📈

---

**Last Updated**: January 9, 2026  
**Latest**: Added Google OAuth & Email/Password Authentication  
**Repository**: [GitHub - void1x/Rainflow-Terminal](https://github.com/void1x/Rainflow-Terminal)  
**Status**: Active Development ✅
