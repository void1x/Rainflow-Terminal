import { X, Share2, Bookmark } from 'lucide-react'
import SentimentBadge from './SentimentBadge'

export default function NewsDetail({ article, onClose }) {
  return (
    <div className="card p-6 sticky top-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-text-primary font-semibold text-lg pr-4">{article.title}</h2>
        <button onClick={onClose} className="text-text-tertiary hover:text-text-primary flex-shrink-0">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-text-tertiary text-sm">{article.source}</span>
              <span className="text-text-tertiary text-sm">•</span>
              <span className="text-text-tertiary text-sm">{article.timestamp}</span>
            </div>
            {article.symbol && (
              <span className="text-xs px-2 py-1 rounded bg-primary bg-opacity-10 text-primary">{article.symbol}</span>
            )}
          </div>
        </div>

        <SentimentBadge sentiment={article.sentiment} />

        <div className="bg-surface rounded p-4">
          <p className="text-text-secondary text-sm leading-relaxed">{article.content}</p>
        </div>

        <div className="flex gap-2 pt-4 border-t border-border-color">
          <button className="flex-1 px-3 py-2 rounded bg-surface hover:bg-surface-hover text-text-primary text-sm transition flex items-center justify-center gap-2">
            <Share2 size={16} />
            Share
          </button>
          <button className="flex-1 px-3 py-2 rounded bg-surface hover:bg-surface-hover text-text-primary text-sm transition flex items-center justify-center gap-2">
            <Bookmark size={16} />
            Save
          </button>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-3 py-2 rounded bg-primary hover:bg-opacity-90 text-white text-sm text-center transition font-medium"
        >
          Read Full Article
        </a>
      </div>
    </div>
  )
}
