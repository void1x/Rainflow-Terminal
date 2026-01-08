export const calculatePortfolioValue = (positions, currentPrices) => {
  return positions.reduce((total, position) => {
    const price = currentPrices[position.symbol] || 0
    return total + position.shares * price
  }, 0)
}

export const calculatePortfolioCost = (positions) => {
  return positions.reduce((total, position) => {
    return total + position.shares * position.avgCost
  }, 0)
}

export const calculatePortfolioGainLoss = (positions, currentPrices) => {
  const currentValue = calculatePortfolioValue(positions, currentPrices)
  const costValue = calculatePortfolioCost(positions)
  return currentValue - costValue
}

export const calculatePortfolioReturn = (positions, currentPrices) => {
  const gainLoss = calculatePortfolioGainLoss(positions, currentPrices)
  const costValue = calculatePortfolioCost(positions)
  return costValue > 0 ? (gainLoss / costValue) * 100 : 0
}

export const calculateAllocationPercentage = (position, totalValue, currentPrices) => {
  const price = currentPrices[position.symbol] || 0
  const positionValue = position.shares * price
  return totalValue > 0 ? (positionValue / totalValue) * 100 : 0
}

export const calculateSharpeRatio = (returns, riskFreeRate = 0.02) => {
  if (returns.length === 0) return 0
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length
  const stdDev = Math.sqrt(variance)
  return stdDev > 0 ? (avgReturn - riskFreeRate) / stdDev : 0
}

export const calculateBeta = (returns, marketReturns) => {
  if (returns.length === 0 || marketReturns.length === 0) return 1
  
  const n = Math.min(returns.length, marketReturns.length)
  const avgReturn = returns.slice(0, n).reduce((a, b) => a + b, 0) / n
  const avgMarket = marketReturns.slice(0, n).reduce((a, b) => a + b, 0) / n

  let covariance = 0
  let marketVariance = 0

  for (let i = 0; i < n; i++) {
    covariance += (returns[i] - avgReturn) * (marketReturns[i] - avgMarket)
    marketVariance += Math.pow(marketReturns[i] - avgMarket, 2)
  }

  covariance /= n
  marketVariance /= n

  return marketVariance > 0 ? covariance / marketVariance : 1
}

export const calculateVolatility = (prices) => {
  if (prices.length < 2) return 0
  const returns = []
  
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }

  const mean = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length
  return Math.sqrt(variance) * Math.sqrt(252) // Annualized volatility
}

export const calculateMovingAverage = (prices, period) => {
  const ma = []
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
    ma.push(sum / period)
  }
  return ma
}

export const calculateRSI = (prices, period = 14) => {
  if (prices.length < period + 1) return []

  const changes = []
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1])
  }

  const gains = changes.map((c) => (c > 0 ? c : 0))
  const losses = changes.map((c) => (c < 0 ? -c : 0))

  const avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period
  const avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period

  const rsi = []
  let prevAvgGain = avgGain
  let prevAvgLoss = avgLoss

  for (let i = period; i < prices.length; i++) {
    const currentGain = gains[i]
    const currentLoss = losses[i]

    prevAvgGain = (prevAvgGain * (period - 1) + currentGain) / period
    prevAvgLoss = (prevAvgLoss * (period - 1) + currentLoss) / period

    const rs = prevAvgGain / prevAvgLoss
    const rsiValue = 100 - 100 / (1 + rs)
    rsi.push(rsiValue)
  }

  return rsi
}

export const calculateMACD = (prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
  const ema = (data, period) => {
    const k = 2 / (period + 1)
    let emaValue = data[0]
    const result = [emaValue]

    for (let i = 1; i < data.length; i++) {
      emaValue = data[i] * k + emaValue * (1 - k)
      result.push(emaValue)
    }
    return result
  }

  const fastEMA = ema(prices, fastPeriod)
  const slowEMA = ema(prices, slowPeriod)

  const macd = fastEMA.map((val, i) => val - slowEMA[i])
  const signal = ema(macd, signalPeriod)

  return {
    macd,
    signal,
    histogram: macd.map((val, i) => (signal[i] ? val - signal[i] : 0)),
  }
}
