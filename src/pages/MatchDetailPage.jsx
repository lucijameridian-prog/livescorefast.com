import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getEventDetails, getEventTimeline, getEventStats, getEventLineup, getLiveMatches } from '../api/sports'
import TeamBadge from '../components/TeamBadge'
import { teamColor } from '../utils/team'
import { matchStatus, statusBadgeStyle, isLiveType } from '../utils/status'

const PANEL_HEAD = { background: '#0a0f1a', padding: '11px 16px', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '1px', color: 'var(--gold)', textTransform: 'uppercase', borderBottom: '1px solid var(--line)' }

function timelineIcon(type) {
  const t = (type || '').toLowerCase()
  if (t.includes('goal')) return <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', border: '2px solid #0e1320', display: 'inline-flex', flexShrink: 0, boxShadow: '0 0 0 1px rgba(255,255,255,.25)' }} />
  if (t.includes('yellow')) return <span style={{ width: 12, height: 16, borderRadius: 2, background: '#F6C915', display: 'inline-block', flexShrink: 0 }} />
  if (t.includes('red')) return <span style={{ width: 12, height: 16, borderRadius: 2, background: '#ff3232', display: 'inline-block', flexShrink: 0 }} />
  if (t.includes('subst')) return <span className="font-cond" style={{ color: '#1FA84A', fontWeight: 800, fontSize: 15, flexShrink: 0 }}>⇄</span>
  return <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--mut)', flexShrink: 0 }} />
}

export default function MatchDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [stats, setStats] = useState([])
  const [lineup, setLineup] = useState([])
  const [other, setOther] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('summary')

  useEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0)
    Promise.all([getEventDetails(id), getEventTimeline(id), getEventStats(id), getEventLineup(id)])
      .then(([ev, tl, st, lu]) => { setEvent(ev); setTimeline(tl || []); setStats(st || []); setLineup(lu || []) })
      .finally(() => setLoading(false))
    getLiveMatches().then(m => setOther((m || []).filter(x => x.idEvent !== id).slice(0, 5))).catch(() => {})
  }, [id])

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div style={{ width: 32, height: 32, border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .8s linear infinite' }} /></div>
  if (!event) return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--mut)' }}><p>Match not found.</p><button onClick={() => navigate(-1)} style={{ marginTop: 16, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>← Go back</button></div>

  const st = matchStatus(event)
  const live = isLiveType(st.type)
  const home = { name: event.strHomeTeam, logo: event.strHomeTeamBadge, color: teamColor(event.strHomeTeam || '') }
  const away = { name: event.strAwayTeam, logo: event.strAwayTeamBadge, color: teamColor(event.strAwayTeam || '') }

  const tabBtn = (id2, label) => {
    const active = tab === id2
    return <button key={id2} onClick={() => setTab(id2)} className="font-cond" style={{ flex: 1, background: 'transparent', border: 'none', fontWeight: 700, fontSize: 15, letterSpacing: '.6px', padding: '14px 0', cursor: 'pointer', textTransform: 'uppercase', color: active ? '#fff' : 'var(--mut)', boxShadow: active ? 'inset 0 -3px 0 var(--accent)' : 'none' }}>{label}</button>
  }

  const info = [
    ['Competition', event.strLeague],
    ['Venue', event.strVenue],
    ['Referee', event.strReferee],
    ['Attendance', event.intAttendance ? Number(event.intAttendance).toLocaleString() : null],
    ['Date', `${event.dateEvent || ''} ${event.strTime ? event.strTime.slice(0, 5) : ''}`],
  ].filter(r => r[1] && String(r[1]).trim())

  const homeLineup = lineup.filter(l => l.strTeam === event.strHomeTeam)
  const awayLineup = lineup.filter(l => l.strTeam === event.strAwayTeam)

  return (
    <div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 18px 0', display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, color: 'var(--mut)' }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--mut)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>Live Scores
        </button>
        <span>/</span><span style={{ color: '#cfd8e4' }}>{event.strLeague}</span>
      </div>

      <div style={{ maxWidth: 1180, margin: '14px auto 0', padding: '0 18px' }}>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', background: 'radial-gradient(120% 140% at 50% -20%,#21304a 0%,#0d1320 60%,#090d16 100%)' }}>
          <div style={{ padding: '22px 28px 26px' }}>
            <div style={{ textAlign: 'center', fontSize: 12.5, fontWeight: 600, letterSpacing: '1px', color: '#b9c4d4', textTransform: 'uppercase', marginBottom: 18 }}>{event.strLeague}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <TeamBadge name={home.name} logo={home.logo} size={78} fontSize="26px" />
                <span className="font-cond" style={{ fontWeight: 700, fontSize: 22, letterSpacing: '.5px', color: '#fff', textAlign: 'center' }}>{home.name}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 200 }}>
                <span style={statusBadgeStyle(st.type)}>
                  {st.type === 'live' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff3232', animation: 'lsf-blink 1s infinite' }} />}
                  {live ? `LIVE · ${st.text}` : st.text}
                </span>
                <div className="font-cond" style={{ display: 'flex', alignItems: 'center', gap: 18, fontWeight: 800, fontSize: 64, lineHeight: 1, color: '#fff' }}>
                  <span>{event.intHomeScore ?? '-'}</span><span style={{ color: 'var(--mut)', fontSize: 40 }}>:</span><span>{event.intAwayScore ?? '-'}</span>
                </div>
                {(event.intHomeScoreHalf != null && event.intHomeScoreHalf !== '') && <span style={{ fontSize: 12, color: 'var(--mut)' }}>HT: {event.intHomeScoreHalf} - {event.intAwayScoreHalf}</span>}
                {event.strVenue && <span style={{ fontSize: 12, color: 'var(--mut)' }}>{event.strVenue}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <TeamBadge name={away.name} logo={away.logo} size={78} fontSize="26px" />
                <span className="font-cond" style={{ fontWeight: 700, fontSize: 22, letterSpacing: '.5px', color: '#fff', textAlign: 'center' }}>{away.name}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid var(--line)', background: 'rgba(0,0,0,.25)' }}>
            {tabBtn('summary', 'Summary')}{tabBtn('stats', 'Stats')}{tabBtn('lineup', 'Lineup')}
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <main style={{ minWidth: 0 }}>
          {tab === 'summary' && (
            <div className="panel">
              <div style={PANEL_HEAD}>Match Timeline</div>
              <div style={{ padding: '8px 16px 16px' }}>
                {timeline.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--mut)', fontSize: 14 }}>No timeline data available.</div>
                ) : timeline.slice().sort((a, b) => parseInt(a.intClockTime || a.intTime || 0) - parseInt(b.intClockTime || b.intTime || 0)).map((e, i) => {
                  const isHome = e.strTeam === event.strHomeTeam
                  const text = e.strPlayer + (e.strAssist ? ` (${e.strAssist})` : '')
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 9, textAlign: 'right', minWidth: 0 }}>
                        {isHome && <><span style={{ fontSize: 13.5, color: '#dbe3ee' }}>{text}</span>{timelineIcon(e.strTimelineType)}</>}
                      </div>
                      <div className="font-cond" style={{ flexShrink: 0, width: 44, textAlign: 'center', fontWeight: 800, fontSize: 14, color: '#fff', background: 'rgba(255,255,255,.06)', borderRadius: 5, padding: '3px 0' }}>{(e.intClockTime || e.intTime || '')}{(e.intClockTime || e.intTime) ? "'" : ''}</div>
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 9, minWidth: 0 }}>
                        {!isHome && <>{timelineIcon(e.strTimelineType)}<span style={{ fontSize: 13.5, color: '#dbe3ee' }}>{text}</span></>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'stats' && (
            <div className="panel">
              <div style={{ ...PANEL_HEAD, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Match Stats</span>
                <span style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--mut)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)' }} />{home.name}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: '#3a8ad9' }} />{away.name}</span>
                </span>
              </div>
              <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 17 }}>
                {stats.length === 0 ? <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--mut)', fontSize: 14 }}>No stats available.</div> : stats.map((s, i) => {
                  const h = parseFloat(s.intHome) || 0, a = parseFloat(s.intAway) || 0, tot = h + a || 1
                  const hp = Math.round(h / tot * 100)
                  return (
                    <div key={i}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                        <span className="font-cond" style={{ fontWeight: 800, fontSize: 17, color: '#fff', minWidth: 48 }}>{s.intHome}</span>
                        <span style={{ fontSize: 12, color: 'var(--mut)', fontWeight: 600, letterSpacing: '.5px', textTransform: 'uppercase' }}>{s.strStat}</span>
                        <span className="font-cond" style={{ fontWeight: 800, fontSize: 17, color: '#fff', minWidth: 48, textAlign: 'right' }}>{s.intAway}</span>
                      </div>
                      <div style={{ display: 'flex', height: 7, borderRadius: 4, overflow: 'hidden', background: 'rgba(255,255,255,.05)', gap: 2 }}>
                        <div style={{ width: `${hp}%`, background: 'var(--accent)', borderRadius: 4 }} />
                        <div style={{ width: `${100 - hp}%`, background: '#3a8ad9', borderRadius: 4 }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {tab === 'lineup' && (
            <div className="panel">
              <div style={PANEL_HEAD}>Starting Lineups</div>
              {lineup.length === 0 ? <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--mut)', fontSize: 14 }}>No lineup data available.</div> : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  {[{ team: home, players: homeLineup }, { team: away, players: awayLineup }].map((side, k) => (
                    <div key={k} style={{ borderRight: k === 0 ? '1px solid var(--line)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: '1px solid var(--line)' }}>
                        <TeamBadge name={side.team.name} logo={side.team.logo} size={26} />
                        <span className="font-cond" style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{side.team.name}</span>
                      </div>
                      {side.players.map((p, i) => (
                        <div key={i} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
                          <span className="font-cond" style={{ width: 24, textAlign: 'center', fontWeight: 800, fontSize: 14, color: 'var(--mut)' }}>{p.intSquadNo || ''}</span>
                          <span style={{ flex: 1, fontSize: 13.5, color: p.strPosition === 'Goalkeeper' ? 'var(--gold)' : '#dbe3ee' }}>{p.strPlayer}</span>
                          <span style={{ fontSize: 10, color: 'var(--mut)', fontWeight: 700, letterSpacing: '.5px' }}>{p.strPosition?.slice(0, 3).toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        <aside className="col-right" style={{ position: 'static' }}>
          {info.length > 0 && (
            <div className="panel">
              <div style={PANEL_HEAD}>Match Info</div>
              {info.map(([k, v]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: 13 }}>
                  <span style={{ color: 'var(--mut)' }}>{k}</span><span style={{ color: '#dbe3ee', fontWeight: 600, textAlign: 'right' }}>{v}</span>
                </div>
              ))}
            </div>
          )}
          {other.length > 0 && (
            <div className="panel">
              <div style={{ ...PANEL_HEAD, color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                <span>Other Live</span><Link to="/" style={{ color: 'var(--gold)', fontSize: 11.5, fontWeight: 700, textDecoration: 'none' }}>ALL »</Link>
              </div>
              {other.map(m => {
                const ms = matchStatus(m)
                return (
                  <Link key={m.idEvent} to={`/match/${m.idEvent}`} className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,.04)', textDecoration: 'none' }}>
                    <span style={{ ...statusBadgeStyle(ms.type), minWidth: 36, justifyContent: 'center', fontSize: 11, padding: '2px 7px' }}>{ms.text}</span>
                    <span style={{ flex: 1, minWidth: 0, fontSize: 13 }}>
                      <span style={{ display: 'flex', justifyContent: 'space-between', color: '#dbe3ee' }}><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.strHomeTeam}</span><span style={{ fontWeight: 800, color: '#fff', marginLeft: 8 }}>{m.intHomeScore ?? '-'}</span></span>
                      <span style={{ display: 'flex', justifyContent: 'space-between', color: '#dbe3ee' }}><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.strAwayTeam}</span><span style={{ fontWeight: 800, color: '#fff', marginLeft: 8 }}>{m.intAwayScore ?? '-'}</span></span>
                    </span>
                  </Link>
                )
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
