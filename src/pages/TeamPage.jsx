import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import TeamBadge from '../components/TeamBadge'
import { teamColor } from '../utils/team'

const PANEL_HEAD = { background: '#0a0f1a', padding: '10px 16px', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '1px', color: 'var(--gold)', textTransform: 'uppercase', borderBottom: '1px solid var(--line)' }

const POS_ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Attacker']
function posGroup(p) {
  const s = (p || '').toLowerCase()
  if (s.includes('keeper')) return 'Goalkeepers'
  if (s.includes('def') || s.includes('back')) return 'Defenders'
  if (s.includes('mid')) return 'Midfielders'
  if (s.includes('for') || s.includes('attack') || s.includes('wing') || s.includes('striker')) return 'Forwards'
  return 'Squad'
}

export default function TeamPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('squad')

  useEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0)
    Promise.all([
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`),
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${id}`),
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${id}`),
    ]).then(([t, p, e]) => {
      setTeam((t.data.teams || [])[0] || null)
      setPlayers((p.data.player || []).filter(x => x.strStatus !== 'Retired'))
      setEvents(e.data.results || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div style={{ width: 32, height: 32, border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .8s linear infinite' }} /></div>
  if (!team) return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--mut)' }}><p>Team not found.</p><button onClick={() => navigate(-1)} style={{ marginTop: 16, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>← Go back</button></div>

  const color = teamColor(team.strTeam || '')
  const meta = [
    ['Country', team.strCountry], ['Founded', team.intFormedYear], ['Stadium', team.strStadium], ['League', team.strLeague],
  ].filter(m => m[1])

  // group squad
  const groups = {}
  players.forEach(p => { const g = posGroup(p.strPosition); (groups[g] = groups[g] || []).push(p) })
  const orderedGroups = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards', 'Squad'].filter(g => groups[g])

  return (
    <div>
      {/* HERO */}
      <div style={{ background: `radial-gradient(120% 160% at 18% -30%,${color} 0%,#0d1320 55%,#090d16 100%)`, borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 18px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <TeamBadge name={team.strTeam} logo={team.strBadge} size={96} fontSize="32px" />
          <div style={{ minWidth: 0 }}>
            {team.strLeague && <div style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5 }}>{team.strLeague}</div>}
            <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(28px,7vw,42px)', lineHeight: .95, color: '#fff', margin: 0 }}>{team.strTeam}</h1>
            <div style={{ display: 'flex', gap: 22, marginTop: 14, flexWrap: 'wrap' }}>
              {meta.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 10.5, color: 'var(--mut)', letterSpacing: '.5px', textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#dbe3ee' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="detail-grid">
        <main style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
            {[['squad', `Squad (${players.length})`], ['results', 'Last Results']].map(([id2, label]) => {
              const active = tab === id2
              return <button key={id2} onClick={() => setTab(id2)} className="font-cond" style={{ background: active ? 'var(--accent)' : 'rgba(255,255,255,.05)', border: `1px solid ${active ? 'var(--accent)' : 'var(--line)'}`, color: active ? '#fff' : '#b9c4d4', fontWeight: 700, fontSize: 14, letterSpacing: '.5px', padding: '9px 20px', borderRadius: 7, cursor: 'pointer', textTransform: 'uppercase' }}>{label}</button>
            })}
          </div>

          {tab === 'squad' && (
            players.length === 0 ? <div className="panel" style={{ padding: 30, textAlign: 'center', color: 'var(--mut)' }}>No squad data available.</div> :
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {orderedGroups.map(g => (
                <div key={g} className="panel">
                  <div style={PANEL_HEAD}>{g}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
                    {groups[g].map(p => (
                      <Link key={p.idPlayer} to={`/player/${p.idPlayer}`} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,.04)', borderRight: '1px solid rgba(255,255,255,.04)', textDecoration: 'none' }}>
                        <span className="font-cond" style={{ width: 30, textAlign: 'center', fontWeight: 800, fontSize: 17, color: 'var(--mut)' }}>{p.strNumber || ''}</span>
                        {p.strThumb ? <img src={p.strThumb} alt="" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} /> : <TeamBadge name={p.strPlayer} size={34} />}
                        <span style={{ flex: 1, minWidth: 0 }}>
                          <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.strPlayer}</span>
                          <span style={{ display: 'block', fontSize: 11, color: 'var(--mut)' }}>{p.strNationality} · {p.strPosition}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'results' && (
            <div className="panel">
              <div style={PANEL_HEAD}>Recent Results</div>
              {events.length === 0 ? <div style={{ padding: 30, textAlign: 'center', color: 'var(--mut)' }}>No recent results.</div> : events.map(e => (
                <Link key={e.idEvent} to={`/match/${e.idEvent}`} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto 1fr', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,.04)', textDecoration: 'none' }}>
                  <span style={{ fontSize: 11.5, color: 'var(--mut)' }}>{e.dateEvent}</span>
                  <span style={{ fontSize: 14, color: '#dbe3ee', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.strHomeTeam}</span>
                  <span className="font-cond" style={{ fontWeight: 800, fontSize: 17, color: '#fff', background: 'rgba(255,255,255,.06)', padding: '2px 12px', borderRadius: 5 }}>{e.intHomeScore ?? '-'} - {e.intAwayScore ?? '-'}</span>
                  <span style={{ fontSize: 14, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.strAwayTeam}</span>
                </Link>
              ))}
            </div>
          )}
        </main>

        <aside className="col-right" style={{ position: 'static' }}>
          {team.strDescriptionEN && (
            <div className="panel">
              <div style={PANEL_HEAD}>About</div>
              <p style={{ padding: 16, fontSize: 13.5, lineHeight: 1.6, color: '#aeb9c9', margin: 0, maxHeight: 360, overflow: 'auto' }}>{team.strDescriptionEN.slice(0, 600)}…</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
