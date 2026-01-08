# RainFlow Terminal

A Bloomberg Terminal-inspired financial dashboard built with React, TailwindCSS, and Recharts. Real-time stock market data visualization with a professional, dark-themed user interface.

![RainFlow Terminal](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

✨ **Professional Dashboard**
- Dark, Bloomberg-style interface with modern aesthetics
- Real-time market indices (S&P 500, NASDAQ, DOW JONES)
- Top gainers and losers display
- Interactive stock price charts with 30-day historical data

📊 **Interactive Charts**
- Line charts powered by Recharts
- Real-time price updates (simulated every 2-3 seconds)
- Multiple time range selectors (1D, 1W, 1M, 3M, 1Y, ALL)
- Color-coded for positive/negative changes (green/red)

💼 **Portfolio Management**
- Track mock portfolio with 5 stocks
- View holdings, gains/losses, and percentages
- Real-time value updates

👁️ **Watchlist**
- Monitor 7 stocks with live price updates
- Quick access to price changes and percentages
- Auto-refreshing every 3 seconds

🔍 **Stock Search**
- Search by symbol or company name
- Dropdown results with instant preview
- Quick navigation to detailed stock view

📱 **Multi-Page Navigation**
- **Dashboard** - Main trading view with charts and portfolio
- **Markets** - Full grid of all available stocks
- **Settings** - User preferences and account settings

## Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 7.3
- **Styling**: TailwindCSS 3.3 + Custom CSS
- **Charts**: Recharts 2.10
- **Icons**: Lucide React 0.294
- **Routing**: React Router DOM 6.20
- **Font**: Inter (Google Fonts)

## Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Setup

1. **Clone the repository**
```powershell
git clone https://github.com/void1x/Rainflow-Terminal.git
cd Rainflow-Terminal
```

2. **Install dependencies**
```powershell
npm install
```

3. **Start development server**
```powershell
npm run dev
```

The app will be available at `http://localhost:5173`

## Scripts

```powershell
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
rainflow-terminal/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation with search
│   │   ├── Dashboard.jsx        # Main dashboard layout
│   │   ├── MarketOverview.jsx   # Market indices & gainers/losers
│   │   ├── StockChart.jsx       # Interactive price chart
│   │   ├── StockCard.jsx        # Individual stock card
│   │   ├── Portfolio.jsx        # Portfolio summary
│   │   ├── Watchlist.jsx        # Watchlist panel
│   │   ├── Markets.jsx          # Markets page (all stocks)
│   │   └── Settings.jsx         # Settings page
│   ├── hooks/
│   │   └── useRealtimePrice.js  # Real-time price updates hook
│   ├── data/
│   │   └── mockData.js          # Mock stock data generators
│   ├── App.jsx                  # Root component with routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & TailwindCSS
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
└── package.json                # Project dependencies
```

## Features in Detail

### Dashboard Page
Main view showing:
- **Market Indices**: S&P 500, NASDAQ, DOW JONES with live changes
- **Top Gainers/Losers**: 5 stocks with highest and lowest performance
- **Stock Chart**: Large interactive chart with real-time price updates
- **Portfolio**: Mock portfolio showing positions, values, and P&L
- **Watchlist**: Quick-access list of 7 monitored stocks

### Markets Page
Grid view of all 8 stocks with:
- Current price
- Change percentage
- Visual indicators (badges)
- Hover effects for better UX

### Settings Page
User preferences including:
- Appearance settings (Dark mode, Compact view)
- Notification preferences
- Security options

## Mock Data

The application includes realistic mock data for 8 stocks:
- **AAPL** - Apple Inc.
- **MSFT** - Microsoft Corp.
- **GOOGL** - Alphabet Inc.
- **AMZN** - Amazon.com Inc.
- **TSLA** - Tesla Inc.
- **META** - Meta Platforms
- **NVDA** - NVIDIA Corp.
- **JPM** - JPMorgan Chase

Prices update every 2-3 seconds to simulate real-time trading.

## UI/UX Design

### Color Palette
- **Primary**: Indigo (#6366f1)
- **Success**: Emerald (#10b981)
- **Danger**: Red (#ef4444)
- **Warning**: Amber (#f59e0b)
- **Backgrounds**: Dark blue (#0a0e27, #101430)
- **Cards**: Slate (#1a202c)

### Features
- Smooth transitions and hover states
- Custom scrollbar styling
- Responsive grid layouts
- Professional typography hierarchy
- Card elevation with shadows
- Gradient accents on section headers

## Future Enhancements

- [ ] Real API integration (Alpha Vantage, Finnhub, etc.)
- [ ] User authentication and accounts
- [ ] Persistent portfolio storage
- [ ] Advanced charting tools (candlesticks, indicators)
- [ ] News feed integration
- [ ] Price alerts and notifications
- [ ] Dark/Light theme toggle
- [ ] Mobile responsive design
- [ ] Export portfolio data
- [ ] Trading simulation

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)

## Performance

- Optimized with Vite for fast development
- Lazy loading of components
- Efficient re-renders with React hooks
- Debounced search functionality
- Optimized chart rendering

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Author

**void1x** - [GitHub](https://github.com/void1x)

## Acknowledgments

- Inspired by Bloomberg Terminal
- Built with React, TailwindCSS, and Recharts
- Icons from Lucide React
- Fonts from Google Fonts

## Contact & Support

For issues, feature requests, or questions, please open an issue on GitHub.

---

**Note**: This is a demo application with simulated data. For production use, integrate with real market data APIs.
