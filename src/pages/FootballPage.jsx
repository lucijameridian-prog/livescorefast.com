import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFixturesByDate } from '../api/sports'
import DatePicker from '../components/DatePicker'
import SportSidebar from '../components/SportSidebar'
import SportsList from '../components/SportsList'
import Standings from '../components/Standings'
import TeamBadge from '../components/TeamBadge'
import { leagueCode, teamColor } from '../utils/team'
import { matchStatus, isLiveType } from '../utils/status'

function MatchRow({ m }) {
  const navigate = useNavigate()
  const st = matchStatus(m)
  const live = isLiveType(st.type)
  const sched = st.type === 'sched'

  let timeColor = '#b9c4d4'
  if (st.type === 'live') timeColor = '#ff6b6b'
  else if (st.type === 'ht') timeColor = 'var(--gold)'
  else if (st.type === 'ft') timeColor = 'var(--mut)'

  const scoreStyle = sched
    ? { fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, color: 'var(--mut)', textAlign: 'center' }
    : { fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 18, color: live ? '#fff' : '#aeb9c9', textAlign: 'center' }

  return (
    <div onClick={() => m.idEvent && navigate(`/match/${m.idEvent}`)} className="row-hover"
      style={{ display: 'grid', gridTemplateColumns: '62px 1fr 54px 1fr 38px', alignItems: 'center', gap: 10, padding: '11px 15px', borderBottom: '1px solid rgba(255,255,255,.04)', cursor: 'pointer' }}>
      <span className="font-cond" style={{ fontWeight: 700, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 5, color: timeColor }}>
        {st.type === 'live' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3232', animation: 'lsf-blink 1s infinite' }} />}
        {st.text}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 9, justifyContent: 'flex-end', minWidth: 0 }}>
        <span style={{ fontSize: 14, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'right' }}>{m.strHomeTeam}</span>
        <TeamBadge name={m.strHomeTeam} logo={m.strHomeTeamBadge} size={22} />
      </span>
      <span style={scoreStyle}>{sched ? 'vs' : `${m.intHomeScore ?? '-'} - ${m.intAwayScore ?? '-'}`}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 9, justifyContent: 'flex-start', minWidth: 0 }}>
        <TeamBadge name={m.strAwayTeam} logo={m.strAwayTeamBadge} size={22} />
        <span style={{ fontSize: 14, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.strAwayTeam}</span>
      </span>
      <span style={{ display: 'flex', justifyContent: 'center', color: 'var(--mut)' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z" /></svg>
      </span>
    </div>
  )
}

export default function FootballPage() {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLeague, setSelectedLeague] = useState(null)

  useEffect(() => {
    setLoading(true)
    getFixturesByDate(date).then(d => setMatches(d || [])).catch(() => setMatches([])).finally(() => setLoading(false))
  }, [date])

  const filtered = selectedLeague ? matches.filter(m => m.idLeague === selectedLeague) : matches
  const liveTotal = filtered.filter(m => isLiveType(matchStatus(m).type)).length

  // group by league
  const grouped = filtered.reduce((acc, m) => {
    const key = m.idLeague || 'other'
    if (!acc[key]) acc[key] = { name: m.strLeague || 'Other', country: m.strCountry || '', games: [] }
    acc[key].games.push(m)
    return acc
  }, {})

  return (
    <div className="home-grid">
      <aside className="col-left">
        <SportSidebar sport="football" selected={selectedLeague} onSelect={setSelectedLeague} />
        <SportsList title="Other Sports" exclude={['/football']} />
      </aside>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 34, height: 34, borderRadius: 7, background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 15, color: '#fff' }}>FB</span>
          <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(22px,6vw,30px)', letterSpacing: '.5px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>Football</h1>
          {liveTotal > 0 && (
            <span className="font-cond" style={{ background: 'rgba(255,50,50,.15)', color: '#ff6b6b', fontWeight: 700, fontSize: 13, padding: '3px 10px', borderRadius: 5, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff3232', animation: 'lsf-blink 1s infinite' }} />{liveTotal} LIVE
            </span>
          )}
        </div>

        <DatePicker selected={date} onChange={setDate} />

        {loading && <div className="panel" style={{ padding: 40, textAlign: 'center', color: 'var(--mut)' }}>Loading fixtures…</div>}
        {!loading && filtered.length === 0 && (
          <div className="panel" style={{ padding: 50, textAlign: 'center', color: 'var(--mut)' }}>
            <div style={{ fontSize: 34, marginBottom: 10 }}>📅</div>No matches on {date}.
          </div>
        )}

        {Object.values(grouped).map((g, i) => (
          <div key={i} className="panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 15px', background: '#0a0f1a', borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: 22, height: 15, borderRadius: 2, background: teamColor(g.name), flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>{leagueCode(g.name)}</span>
              <span className="font-cond" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '.5px', color: '#fff', textTransform: 'uppercase' }}>{g.name}</span>
              {g.country && <span style={{ fontSize: 12, color: 'var(--mut)' }}>{g.country}</span>}
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: 11.5, color: 'var(--mut)' }}>{g.games.length} matches</span>
            </div>
            {g.games.map((m, j) => <MatchRow key={m.idEvent || j} m={m} />)}
          </div>
        ))}
      </main>

      <aside className="col-right">
        <Standings />
      </aside>
    </div>
  )
}
