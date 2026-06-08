export default function DatePicker({ selected, onChange }) {
  const dates = []
  const today = new Date()

  for (let i = -3; i <= 3; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }

  const fmt = (d) => d.toISOString().split('T')[0]
  const label = (d) => {
    const diff = Math.round((d - today) / 86400000)
    if (diff === 0) return 'Today'
    if (diff === -1) return 'Yesterday'
    if (diff === 1) return 'Tomorrow'
    return d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {dates.map(d => {
        const val = fmt(d)
        const isSelected = selected === val
        return (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors
              ${isSelected ? 'bg-accent text-white' : 'bg-dark-700 text-slate-400 hover:text-white hover:bg-dark-600'}`}
          >
            {label(d)}
          </button>
        )
      })}
    </div>
  )
}
