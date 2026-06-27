import { useState, useEffect } from 'react'

// Neutral sports banners (no betting content).
const BANNERS = [
  { eyebrow: 'FIFA World Cup 2026', title: ['EVERY MATCH.', 'EVERY GOAL. LIVE.'], sub: '48 teams · 104 matches · real-time scores & lineups', ghost: '2026', grad: 'linear-gradient(120deg,#1a0605,#7a0a06 55%,#E2231A)', blob: '#ff5a3c' },
  { eyebrow: 'Premier League', title: ['THE TITLE RACE', 'IS LIVE'], sub: 'Live tables, scorers and minute-by-minute updates', ghost: 'EPL', grad: 'linear-gradient(120deg,#13002e,#3d0a78 60%,#6c1fb8)', blob: '#a64bff' },
  { eyebrow: 'Wimbledon 2026', title: ['CENTRE COURT', 'LIVE SCORES'], sub: 'Follow every set, every break point as it happens', ghost: 'SW19', grad: 'linear-gradient(120deg,#04140a,#0a4d24 60%,#1FA84A)', blob: '#5fe08a' },
  { eyebrow: 'NBA Playoffs', title: ['PLAYOFF', 'BASKETBALL LIVE'], sub: 'Quarter-by-quarter scores and box stats', ghost: 'NBA', grad: 'linear-gradient(120deg,#180a02,#a83e08 60%,#f08a1f)', blob: '#ffb347' },
  { eyebrow: 'Match Center', title: ['SCORES, STATS', '& PREDICTIONS'], sub: 'Everything for every match in one place', ghost: 'LIVE', grad: 'linear-gradient(120deg,#0a0a14,#1a1f3a 55%,#3a4a8a)', blob: '#ffd23c' },
]

export default function BannerCarousel() {
  const [idx, setIdx] = useState(0)
  const n = BANNERS.length

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % n), 5000)
    return () => clearInterval(t)
  }, [n])

  return (
    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: 'clamp(168px,40vw,208px)', background: '#0a0f1a' }}>
      <div style={{ display: 'flex', height: '100%', transition: 'transform .5s cubic-bezier(.4,0,.2,1)', transform: `translateX(-${idx * 100}%)` }}>
        {BANNERS.map((b, i) => (
          <div key={i} style={{ minWidth: '100%', height: '100%', position: 'relative', background: b.grad, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(20px,5vw,42px)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -40, top: -40, width: 280, height: 280, borderRadius: '50%', background: b.blob, opacity: .5, filter: 'blur(8px)' }} />
            <div className="font-cond" style={{ position: 'absolute', right: 'clamp(16px,4vw,38px)', bottom: 24, fontWeight: 800, fontSize: 'clamp(64px,18vw,120px)', lineHeight: .8, color: 'rgba(255,255,255,.07)', letterSpacing: '-2px', pointerEvents: 'none' }}>{b.ghost}</div>
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '74%' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 20, padding: '4px 12px', fontSize: 'clamp(9px,2.4vw,11px)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', marginBottom: 12 }}>{b.eyebrow}</div>
              <div className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(26px,7vw,46px)', lineHeight: .92, color: '#fff', textShadow: '0 2px 18px rgba(0,0,0,.4)', letterSpacing: '.5px' }}>
                {b.title.map((l, j) => <div key={j}>{l}</div>)}
              </div>
              <div style={{ fontSize: 'clamp(12px,3vw,14.5px)', color: 'rgba(255,255,255,.85)', marginTop: 8, fontWeight: 500 }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setIdx(i => (i - 1 + n) % n)} style={navBtn('left')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg></button>
      <button onClick={() => setIdx(i => (i + 1) % n)} style={navBtn('right')}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 6l6 6 6 6" /></svg></button>
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 7, zIndex: 3 }}>
        {BANNERS.map((_, i) => (
          <span key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 22 : 8, height: 8, borderRadius: 6, cursor: 'pointer', transition: 'all .3s', background: i === idx ? '#fff' : 'rgba(255,255,255,.4)' }} />
        ))}
      </div>
    </div>
  )
}

const navBtn = (side) => ({
  position: 'absolute', [side]: 12, top: '50%', transform: 'translateY(-50%)',
  width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,.45)',
  border: '1px solid rgba(255,255,255,.18)', color: '#fff', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
})
