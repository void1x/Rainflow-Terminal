import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

export default function ChartControls({ onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={onZoomIn}
        className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-all text-text-secondary hover:text-text-primary"
        title="Zoom In"
      >
        <ZoomIn size={18} />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-all text-text-secondary hover:text-text-primary"
        title="Zoom Out"
      >
        <ZoomOut size={18} />
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-all text-text-secondary hover:text-text-primary"
        title="Reset"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  )
}
