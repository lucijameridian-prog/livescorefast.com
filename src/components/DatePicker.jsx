const DOWS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const QUICKS = ['Yesterday', 'Today', 'Tomorrow', 'This Week']

function offset(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
const fmt = (d) => d.toISOString().split('T')[0]

export default function DatePicker({ selected, onChange }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const quickFor = { Yesterday: fmt(offset(today, -1)), Today: fmt(today), Tomorrow: fmt(offset(today, 1)) }
  const activeQuick = Object.keys(quickFor).find(k => quickFor[k] === selected) || (selected ? 'This Week' : 'Today')

  const strip = []
  for (let off = -3; off <= 5; off++) strip.push(offset(today, off))

  const quickStyle = (active) => ({ flex: 1, background: active ? 'rgba(226,35,26,.12)' : 'transparent', border: 'none', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '11px 0', cursor: 'pointer', textTransform: 'uppercase', color: active ? '#fff' : 'var(--mut)', boxShadow: active ? 'inset 0 -2px 0 var(--accent)' : 'none' })

  return (
    <div className="panel">
      <div style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
        {QUICKS.map(q => (
          <button key={q} onClick={() => quickFor[q] && onChange(quickFor[q])} style={quickStyle(activeQuick === q)}>{q}</button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '9px 12px', overflowX: 'auto' }} className="nav-scroll">
        {strip.map(d => {
          const val = fmt(d)
          const active = selected === val
          return (
            <button key={val} onClick={() => onChange(val)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, minWidth: 48, padding: '6px 0', borderRadius: 7, border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`, background: active ? 'rgba(226,35,26,.14)' : 'transparent', color: active ? '#fff' : '#b9c4d4', cursor: 'pointer', flexShrink: 0 }}>
              <span style={{ fontSize: 10, letterSpacing: '.5px', opacity: .8 }}>{DOWS[d.getDay()]}</span>
              <span className="font-cond" style={{ fontWeight: 800, fontSize: 17 }}>{d.getDate()}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
