export default function AlertBadge({ status }) {
  const statusConfig = {
    active: { bg: 'bg-blue-500', text: 'text-white', label: 'Active' },
    triggered: { bg: 'bg-success', text: 'text-white', label: 'Triggered' },
    expired: { bg: 'bg-gray-600', text: 'text-white', label: 'Expired' },
  }

  const config = statusConfig[status] || statusConfig.active

  return <span className={`px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.text}`}>{config.label}</span>
}
