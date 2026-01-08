import { ExternalLink } from 'lucide-react'
import SentimentBadge from './SentimentBadge'

export default function NewsCard({ article, onSelect }) {
  return (
    <div
      onClick={() => onSelect(article)}
      className="card p-4 hover:border-primary hover:border-opacity-50 cursor-pointer transition group"
    >
      <div className="flex justify-between items-start mb-2 gap-3">
        <h3 className="text-text-primary font-semibold text-sm group-hover:text-primary transition flex-1">{article.title}</h3>
        {article.symbol && (
          <span className="text-xs px-2 py-1 rounded bg-primary bg-opacity-10 text-primary whitespace-nowrap">{article.symbol}</span>
        )}
      </div>

      <p className="text-text-tertiary text-xs mb-3 line-clamp-2">{article.content}</p>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SentimentBadge sentiment={article.sentiment} />
          <span className="text-text-tertiary text-xs">{article.source}</span>
        </div>
        <span className="text-text-tertiary text-xs">{article.timestamp}</span>
      </div>

      <div className="mt-3 pt-3 border-t border-border-color flex justify-end">
        <ExternalLink size={14} className="text-text-tertiary group-hover:text-primary transition" />
      </div>
    </div>
  )
}
