export default function TimeframeSelector({ selectedTimeframe, onTimeframeChange }) {
  const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

  return (
    <div className="flex gap-2 pt-4 border-t border-border-color">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
            selectedTimeframe === timeframe
              ? 'bg-primary text-white'
              : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary'
          }`}
        >
          {timeframe}
        </button>
      ))}
    </div>
  )
}
