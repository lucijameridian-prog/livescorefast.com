import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const SPORTS = [
  { name: 'Football', abbr: 'FB', iconBg: '#1FA84A', to: '/football' },
  { name: 'Basketball', abbr: 'BK', iconBg: '#f08a1f', to: '/basketball' },
  { name: 'Tennis', abbr: 'TN', iconBg: '#b5e61d', to: '/tennis' },
  { name: 'Ice Hockey', abbr: 'IH', iconBg: '#3a8ad9', to: '/hockey' },
  { name: 'Baseball', abbr: 'BB', iconBg: '#c0392b', to: '/baseball' },
  { name: 'Handball', abbr: 'HB', iconBg: '#2980b9', to: '/handball' },
  { name: 'Volleyball', abbr: 'VB', iconBg: '#e67e22', to: '/volleyball' },
  { name: 'Rugby', abbr: 'RG', iconBg: '#16a085', to: '/rugby' },
  { name: 'NFL', abbr: 'AF', iconBg: '#8e44ad', to: '/nfl' },
  { name: 'MMA', abbr: 'MMA', iconBg: '#c0392b', to: '/mma' },
  { name: 'Formula 1', abbr: 'F1', iconBg: '#e2231a', to: '/formula1' },
]

const MAIN = [
  { name: 'Live Scores', to: '/' },
  { name: 'Predictions', to: '/predictions' },
  { name: 'News', to: '/news' },
]

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (to) => { setOpen(false); navigate(to) }

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Menu"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, width: 38, height: 38, background: 'rgba(0,0,0,.18)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 6, cursor: 'pointer', flexShrink: 0, alignItems: 'center' }}>
        {[0, 1, 2].map(i => <span key={i} style={{ width: 18, height: 2, background: '#fff', borderRadius: 2 }} />)}
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 90 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: 'min(82vw,300px)', background: 'var(--panel)', borderRight: '1px solid var(--line)', zIndex: 95, overflowY: 'auto', boxShadow: '4px 0 24px rgba(0,0,0,.5)' }}>
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '16px 16px', background: 'linear-gradient(180deg,#E2231A,#b3120c)' }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none"><path d="M16 3 L28 27 L20.5 27 L16 16 L11.5 27 L4 27 Z" fill="#fff" /><path d="M16 11 L20.5 21 L11.5 21 Z" fill="var(--gold)" /></svg>
              <span className="font-cond" style={{ fontWeight: 800, fontSize: 20, color: '#fff', lineHeight: 1 }}>livescore<span style={{ color: 'var(--gold)' }}>fast</span></span>
              <div style={{ flex: 1 }} />
              <button onClick={() => setOpen(false)} style={{ background: 'rgba(0,0,0,.2)', border: 'none', color: '#fff', width: 30, height: 30, borderRadius: 6, cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>

            {/* main links */}
            <div className="panel-head">Menu</div>
            {MAIN.map(m => {
              const active = m.to === '/' ? pathname === '/' : pathname.startsWith(m.to)
              return (
                <button key={m.to} onClick={() => go(m.to)} className="row-hover font-cond"
                  style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--line)', background: active ? 'rgba(226,35,26,.10)' : 'transparent', boxShadow: active ? 'inset 3px 0 0 var(--accent)' : 'none', border: 'none', borderBottomWidth: 1, color: '#dbe3ee', fontWeight: 700, fontSize: 15, letterSpacing: '.4px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {m.name}
                </button>
              )
            })}

            {/* sports */}
            <div className="panel-head">All Sports</div>
            {SPORTS.map(s => {
              const active = pathname.startsWith(s.to)
              return (
                <button key={s.to} onClick={() => go(s.to)} className="row-hover"
                  style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', gap: 11, padding: '11px 16px', borderBottom: '1px solid var(--line)', background: active ? 'rgba(226,35,26,.10)' : 'transparent', boxShadow: active ? 'inset 3px 0 0 var(--accent)' : 'none', border: 'none', borderBottomWidth: 1, cursor: 'pointer' }}>
                  <span style={{ width: 24, height: 24, borderRadius: 5, background: s.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 800, fontSize: 12 }}>{s.abbr}</span>
                  <span style={{ flex: 1, fontSize: 14, color: '#cfd8e4' }}>{s.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mut)" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
