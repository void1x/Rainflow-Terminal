export default function SentimentBadge({ sentiment }) {
  const config = {
    bullish: { bg: 'bg-success', text: 'text-white', label: '📈 Bullish' },
    neutral: { bg: 'bg-gray-600', text: 'text-white', label: '➡️ Neutral' },
    bearish: { bg: 'bg-danger', text: 'text-white', label: '📉 Bearish' },
  }

  const cfg = config[sentiment] || config.neutral

  return <span className={`px-2 py-1 rounded text-xs font-semibold ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
}
