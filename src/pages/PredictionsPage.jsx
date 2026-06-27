import { useEffect, useState } from 'react'
import { getFixturesByDate } from '../api/sports'
import PredictionCard from '../components/PredictionCard'
import { matchStatus } from '../utils/status'

export default function PredictionsPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const today = new Date()
    const d0 = today.toISOString().split('T')[0]
    const t = new Date(today); t.setDate(today.getDate() + 1)
    const d1 = t.toISOString().split('T')[0]
    setLoading(true)
    Promise.all([getFixturesByDate(d0), getFixturesByDate(d1)])
      .then(([a, b]) => {
        const all = [...(a || []), ...(b || [])]
        // upcoming first, then live; need both team IDs
        const usable = all.filter(m => m.idHomeTeam && m.idAwayTeam)
        const upcoming = usable.filter(m => matchStatus(m).type === 'sched')
        const pool = (upcoming.length ? upcoming : usable).slice(0, 8)
        setMatches(pool)
      })
      .catch(() => setMatches([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <span style={{ width: 34, height: 34, borderRadius: 7, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a1205"><path d="M3 13h2v8H3zm4-6h2v14H7zm4-4h2v18h-2zm4 8h2v10h-2zm4-4h2v14h-2z" /></svg>
        </span>
        <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(22px,6vw,30px)', letterSpacing: '.5px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>Predictions</h1>
      </div>
      <p style={{ fontSize: 12.5, color: 'var(--mut)', margin: '0 0 18px' }}>
        Win / draw / win probabilities for upcoming football matches, from a statistical model based on each team's recent form.
      </p>

      {loading && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>Loading upcoming matches…</div>}
      {!loading && matches.length === 0 && <div className="panel" style={{ padding: 60, textAlign: 'center', color: 'var(--mut)' }}>No upcoming matches to predict right now.</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(330px,1fr))', gap: 16 }}>
        {matches.map(m => (
          <PredictionCard key={m.idEvent}
            home={{ id: m.idHomeTeam, name: m.strHomeTeam, logo: m.strHomeTeamBadge }}
            away={{ id: m.idAwayTeam, name: m.strAwayTeam, logo: m.strAwayTeamBadge }} />
        ))}
      </div>
    </div>
  )
}
