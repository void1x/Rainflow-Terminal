export const calculateTechnicalIndicators = (prices) => {
  const sma50 = calculateSMA(prices, 50)
  const sma200 = calculateSMA(prices, 200)
  const rsi = calculateRSI(prices, 14)
  const macd = calculateMACD(prices)

  return {
    sma50,
    sma200,
    rsi,
    macd,
  }
}

const calculateSMA = (prices, period) => {
  if (prices.length < period) return []

  const sma = []
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0)
    sma.push(sum / period)
  }
  return sma
}

const calculateRSI = (prices, period = 14) => {
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

    const rs = prevAvgLoss > 0 ? prevAvgGain / prevAvgLoss : prevAvgGain
    const rsiValue = 100 - 100 / (1 + rs)
    rsi.push(rsiValue)
  }

  return rsi
}

const calculateMACD = (prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) => {
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

  const macd = []
  for (let i = 0; i < Math.min(fastEMA.length, slowEMA.length); i++) {
    macd.push(fastEMA[i] - slowEMA[i])
  }

  const signal = ema(macd, signalPeriod)

  return {
    macd,
    signal,
    histogram: macd.map((val, i) => (signal[i] ? val - signal[i] : 0)),
  }
}
