export default function DatePicker({ selected, onChange }) {
  const today = new Date()

  const fmt = (d) => d.toISOString().split('T')[0]

  // Quick tabs
  const quickDates = [
    { label: 'Yesterday', date: offset(today, -1) },
    { label: 'Today',     date: today },
    { label: 'Tomorrow',  date: offset(today, 1) },
    { label: 'This Week', date: null }, // special
  ]

  // Full date row: 3 days back + today + 6 days forward
  const allDates = Array.from({ length: 10 }, (_, i) => offset(today, i - 3))

  const selectedInView = allDates.find(d => fmt(d) === selected)
  const isThisWeek = !selectedInView && selected !== fmt(today)

  return (
    <div className="space-y-2">
      {/* Quick tabs */}
      <div className="flex gap-1">
        {quickDates.map(({ label, date }) => {
          const val = date ? fmt(date) : null
          const active = label === 'This Week'
            ? isThisWeek
            : selected === val

          return (
            <button key={label} onClick={() => date && onChange(val)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                ${active ? 'bg-accent text-white' : 'bg-dark-700 text-slate-400 hover:text-white hover:bg-dark-600'}
                ${label === 'This Week' ? 'ml-auto' : ''}`}>
              {label}
            </button>
          )
        })}
      </div>

      {/* Scrollable date row */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1" style={{scrollbarWidth: 'none'}}>
        {allDates.map(d => {
          const val = fmt(d)
          const diff = Math.round((d - today) / 86400000)
          const isSelected = selected === val

          const dayLabel = diff === 0 ? 'Today'
            : diff === -1 ? 'Yesterday'
            : diff === 1 ? 'Tomorrow'
            : d.toLocaleDateString('en', { weekday: 'short' })

          const dateLabel = d.toLocaleDateString('en', { day: 'numeric', month: 'short' })

          return (
            <button key={val} onClick={() => onChange(val)}
              className={`flex flex-col items-center px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors flex-shrink-0
                ${isSelected
                  ? 'bg-accent text-white'
                  : diff === 0
                    ? 'bg-dark-700 border border-accent/40 text-slate-300 hover:bg-dark-600'
                    : 'bg-dark-700 text-slate-400 hover:text-white hover:bg-dark-600'
                }`}>
              <span className="font-medium">{dayLabel}</span>
              <span className="text-xs opacity-70">{dateLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function offset(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
