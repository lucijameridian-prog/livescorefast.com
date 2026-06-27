import { useEffect, useState } from 'react'
import { getGamesByDate } from '../api/sports'
import GenericCard from '../components/GenericCard'
import DatePicker from '../components/DatePicker'
import SportSidebar from '../components/SportSidebar'
import SportsList from '../components/SportsList'
import { matchStatus, isLiveType } from '../utils/status'

export default function GenericSportPage({ sport, label, abbr = 'SP', iconBg = '#3a8ad9' }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState(null)

  useEffect(() => {
    setLoading(true)
    getGamesByDate(sport, date).then(d => setGames(d || [])).catch(() => setGames([])).finally(() => setLoading(false))
  }, [sport, date])

  const filtered = selectedLeague ? games.filter(g => g.idLeague === selectedLeague) : games
  const liveTotal = filtered.filter(g => isLiveType(matchStatus(g).type)).length

  return (
    <div className="sport-grid">
      <aside className="col-left">
        <SportSidebar sport={sport} selected={selectedLeague} onSelect={setSelectedLeague} />
        <SportsList title="Other Sports" exclude={[`/${sport}`]} />
      </aside>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: 7, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: '#fff' }}>{abbr}</span>
          <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 30, letterSpacing: '.5px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>{label}</h1>
          {liveTotal > 0 && (
            <span className="font-cond" style={{ background: 'rgba(255,50,50,.15)', color: '#ff6b6b', fontWeight: 700, fontSize: 13, padding: '3px 10px', borderRadius: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3232', animation: 'lsf-blink 1s infinite' }} />{liveTotal} LIVE
            </span>
          )}
        </div>

        <DatePicker selected={date} onChange={setDate} />

        {loading && <div className="panel" style={{ padding: 40, textAlign: 'center', color: 'var(--mut)' }}>Loading games…</div>}
        {!loading && filtered.length === 0 && (
          <div className="panel" style={{ padding: 50, textAlign: 'center', color: 'var(--mut)' }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>📅</div>No {label} games on {date}.
          </div>
        )}
        {!loading && filtered.length > 0 && (
          <div className="card-grid">{filtered.map((g, i) => <GenericCard key={g.idEvent || i} game={g} />)}</div>
        )}
      </main>
    </div>
  )
}
