import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLiveMatches, getFixturesByDate } from '../api/sports'
import MatchCard from '../components/MatchCard'
import Standings from '../components/Standings'
import SportsList from '../components/SportsList'
import BannerCarousel from '../components/BannerCarousel'
import { teamColor } from '../utils/team'

const TOP_LEAGUES = [
  { name: 'FIFA World Cup 2026', code: 'WC' },
  { name: 'Premier League', code: 'EN' },
  { name: 'La Liga', code: 'ES' },
  { name: 'Serie A', code: 'IT' },
  { name: 'Bundesliga', code: 'DE' },
  { name: 'Champions League', code: 'CL' },
]

const SPORT_LABEL = { Soccer: 'Football', Basketball: 'Basketball', Tennis: 'Tennis', 'Ice Hockey': 'Hockey', Baseball: 'Baseball', 'American Football': 'NFL' }

export default function LivePage() {
  const [live, setLive] = useState([])
  const [football, setFootball] = useState([])
  const [sport, setSport] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = () => getLiveMatches().then(setLive).catch(() => {}).finally(() => setLoading(false))
    load()
    const today = new Date().toISOString().split('T')[0]
    getFixturesByDate(today).then(d => setFootball(d || [])).catch(() => {})
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [])

  // Live Now sport tabs derived from data
  const sportsPresent = [...new Set(live.map(m => m.strSport).filter(Boolean))]
  const curSport = sport && sportsPresent.includes(sport) ? sport : sportsPresent[0]
  const liveFiltered = live.filter(m => m.strSport === curSport).slice(0, 12)

  // Second section: World Cup if present today, else today's football
  const wc = football.filter(m => /world cup/i.test(m.strLeague || ''))
  const featured = wc.length ? wc.slice(0, 9) : football.slice(0, 9)
  const featuredTitle = wc.length ? 'FIFA World Cup 2026 · Group Stage' : "Today's Football"

  return (
    <div className="home-grid">
      {/* LEFT */}
      <aside className="col-left">
        <div className="panel">
          <div className="panel-head">Top Leagues</div>
          {TOP_LEAGUES.map(l => (
            <Link key={l.name} to="/football" className="row-hover" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: '1px solid var(--line)', textDecoration: 'none', fontSize: 13 }}>
              <span style={{ width: 20, height: 14, borderRadius: 2, background: teamColor(l.name), flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>{l.code}</span>
              <span style={{ flex: 1, color: '#cfd8e4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</span>
            </Link>
          ))}
        </div>
        <SportsList title="All Sports" />
      </aside>

      {/* CENTER */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
        <BannerCarousel />

        {/* LIVE NOW */}
        <section style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)' }}>
          <div style={{ background: 'linear-gradient(180deg,#1FA84A,#178a3c)', display: 'flex', alignItems: 'center', padding: '0 16px', minHeight: 46, gap: 14, flexWrap: 'wrap' }}>
            <div className="font-cond" style={{ display: 'flex', alignItems: 'center', gap: 9, fontWeight: 800, fontSize: 17, letterSpacing: '1px', color: '#fff', textTransform: 'uppercase' }}>
              <span style={{ position: 'relative', width: 9, height: 9 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#fff', animation: 'lsf-pulse 1.6s infinite' }} />
              </span>
              Live Now
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, overflowX: 'auto' }} className="nav-scroll">
              {sportsPresent.map(sp => {
                const active = sp === curSport
                return (
                  <button key={sp} onClick={() => setSport(sp)} className="font-cond"
                    style={{ display: 'flex', alignItems: 'center', gap: 5, background: active ? 'rgba(0,0,0,.28)' : 'transparent', border: `1px solid ${active ? 'rgba(255,255,255,.35)' : 'transparent'}`, color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '5px 12px', borderRadius: 5, cursor: 'pointer', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {SPORT_LABEL[sp] || sp}
                  </button>
                )
              })}
            </div>
          </div>
          <div style={{ background: 'var(--panel)', padding: 14 }}>
            {loading ? (
              <div className="card-grid">{Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ height: 96, background: 'rgba(255,255,255,.04)', borderRadius: 9 }} />)}</div>
            ) : liveFiltered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--mut)' }}>No live matches right now.</div>
            ) : (
              <div className="card-grid">{liveFiltered.map(m => <MatchCard key={m.idEvent} match={m} />)}</div>
            )}
          </div>
        </section>

        {/* FEATURED FOOTBALL / WORLD CUP */}
        {featured.length > 0 && (
          <section style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <div style={{ background: 'linear-gradient(90deg,#2a0c0a,#3d1310)', display: 'flex', alignItems: 'center', padding: '0 16px', height: 46, gap: 12, borderBottom: '2px solid var(--accent)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2 L9 9 H2 l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7z" /></svg>
              <span className="font-cond" style={{ fontWeight: 800, fontSize: 17, letterSpacing: '1px', color: '#fff', textTransform: 'uppercase' }}>{featuredTitle}</span>
              <div style={{ flex: 1 }} />
              <Link to="/football" style={{ color: 'var(--gold)', fontSize: 12.5, fontWeight: 700, textDecoration: 'none' }}>ALL FIXTURES »</Link>
            </div>
            <div style={{ background: 'var(--panel)', padding: 14 }}>
              <div className="card-grid">{featured.map(m => <MatchCard key={m.idEvent} match={m} />)}</div>
            </div>
          </section>
        )}
      </main>

      {/* RIGHT */}
      <aside className="col-right">
        <Standings />
        <div style={{ borderRadius: 9, overflow: 'hidden', background: 'linear-gradient(135deg,#2a0c0a,#7a0a06)', border: '1px solid rgba(246,201,21,.25)', padding: '18px 16px', position: 'relative' }}>
          <div style={{ position: 'absolute', right: -20, bottom: -20, width: 130, height: 130, borderRadius: '50%', background: 'rgba(246,201,21,.12)', filter: 'blur(6px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 7 }}>Never miss a goal</div>
            <div className="font-cond" style={{ fontWeight: 800, fontSize: 26, lineHeight: .95, color: '#fff' }}>GET LIVE ALERTS<br />FOR YOUR TEAMS</div>
            <Link to="/football" style={{ display: 'inline-block', marginTop: 14, background: 'var(--gold)', color: '#1a1205', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: '.5px', borderRadius: 6, padding: '9px 18px', textDecoration: 'none' }}>FOLLOW TEAMS</Link>
          </div>
        </div>
      </aside>
    </div>
  )
}
