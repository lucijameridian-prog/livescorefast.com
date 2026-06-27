// Normalize TheSportsDB match status into a type + display text.
// Returns { type: 'live'|'ht'|'ft'|'sched', text }
export function matchStatus(match) {
  const raw = (match.strStatus || match.strProgress || '').trim()
  const s = raw.toUpperCase()
  const time = match.strTime ? match.strTime.slice(0, 5) : ''

  if (['FT', 'AET', 'AOT', 'PEN', 'MATCH FINISHED', 'FINISHED', 'FINAL'].includes(s))
    return { type: 'ft', text: 'FT' }
  if (s === 'HT' || s === 'HALF TIME')
    return { type: 'ht', text: 'HT' }
  if (['NS', 'NOT STARTED', '', 'SCHEDULED', 'TBD', 'POSTP', 'CANC'].includes(s))
    return { type: 'sched', text: time || 'TBD' }
  // Live in-play states: "1H", "2H", "45'", minutes, quarters, etc.
  return { type: 'live', text: raw }
}

export function statusBadgeStyle(type) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontFamily: "'Saira Condensed', sans-serif", fontWeight: 700,
    fontSize: '12px', letterSpacing: '.5px', padding: '2px 8px', borderRadius: '4px',
  }
  if (type === 'live') return { ...base, background: 'rgba(255,50,50,.15)', color: '#ff6b6b' }
  if (type === 'ht') return { ...base, background: 'rgba(246,201,21,.15)', color: 'var(--gold)' }
  if (type === 'ft') return { ...base, background: 'rgba(255,255,255,.08)', color: '#9fabbd' }
  return { ...base, background: 'rgba(255,255,255,.06)', color: '#b9c4d4' }
}

export const isLiveType = (t) => t === 'live' || t === 'ht'
