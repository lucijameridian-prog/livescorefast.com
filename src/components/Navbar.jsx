import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { getLiveMatches } from '../api/sports'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/football', label: 'Football' },
  { to: '/basketball', label: 'Basketball' },
  { to: '/hockey', label: 'Hockey' },
  { to: '/tennis', label: 'Tennis' },
  { to: '/news', label: 'News' },
]

const UTIL = [
  { to: '/', label: 'Results' },
  { to: '/football', label: 'Fixtures' },
  { to: '/news', label: 'News' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [now, setNow] = useState(new Date())
  const [liveCount, setLiveCount] = useState(null)

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 30000)
    getLiveMatches().then(m => setLiveCount(m.length)).catch(() => {})
    return () => clearInterval(clock)
  }, [])

  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* UTILITY STRIP */}
      <div style={{ height: 34, background: '#04060b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', fontSize: 12.5, borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
          <div style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700, letterSpacing: '.5px', padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', fontSize: 12 }}>LIVE SCORES</div>
          {UTIL.map(u => (
            <Link key={u.label} to={u.to} className="util-link" style={{ color: '#b9c4d4', padding: '0 13px', height: '100%', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>{u.label.toUpperCase()}</Link>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#9fabbd' }}>
          {liveCount != null && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--live)', boxShadow: '0 0 8px var(--live)' }} />
              {liveCount} matches live now
            </span>
          )}
          <span style={{ color: '#6f7c90' }} className="hidden sm:inline">{dateStr}</span>
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{timeStr}</span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header style={{ height: 66, background: 'linear-gradient(180deg,#E2231A 0%,#b3120c 100%)', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 26, position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 4px 18px rgba(0,0,0,.45)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M16 3 L28 27 L20.5 27 L16 16 L11.5 27 L4 27 Z" fill="#fff" /><path d="M16 11 L20.5 21 L11.5 21 Z" fill="var(--gold)" /></svg>
          <span className="font-cond" style={{ fontWeight: 800, fontSize: 25, letterSpacing: '.3px', color: '#fff', lineHeight: 1 }}>livescore<span style={{ color: 'var(--gold)' }}>fast</span></span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 3, height: '100%', overflowX: 'auto' }} className="nav-scroll">
          {NAV.map(item => {
            const active = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            return (
              <Link key={item.to} to={item.to} className="font-cond"
                style={{ display: 'flex', alignItems: 'center', height: 38, padding: '0 15px', borderRadius: 6, fontWeight: 700, fontSize: 15, letterSpacing: '.4px', textDecoration: 'none', textTransform: 'uppercase', whiteSpace: 'nowrap', background: active ? '#fff' : 'transparent', color: active ? '#b3120c' : '#fff' }}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ flex: 1 }} />
        <div className="hidden md:block"><SearchBar /></div>
      </header>
    </>
  )
}
