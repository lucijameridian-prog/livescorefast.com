import { Link } from 'react-router-dom'

const TOURS = [{ k: 'Grand Slams', v: 4 }, { k: 'ATP Events', v: '60+' }, { k: 'WTA Events', v: '50+' }, { k: 'Players', v: '2k+' }]

export default function ComingSoonPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 18px', position: 'relative', overflow: 'hidden', minHeight: '70vh' }}>
      <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(181,230,29,.10),transparent 65%)', top: -120, left: -80 }} />
      <div style={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle,rgba(226,35,26,.10),transparent 65%)', bottom: -120, right: -60 }} />
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: 560 }}>
        <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(160deg,#b5e61d,#5a8a0a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 26px', boxShadow: '0 14px 40px rgba(0,0,0,.5)', animation: 'lsf-float 3.5s ease-in-out infinite' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#15300a" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M5 5a13 13 0 0 1 0 14M19 5a13 13 0 0 0 0 14" /></svg>
        </div>
        <div className="font-cond" style={{ display: 'inline-block', background: 'rgba(181,230,29,.14)', border: '1px solid rgba(181,230,29,.35)', color: '#b5e61d', fontWeight: 700, fontSize: 13, letterSpacing: '1.5px', padding: '5px 16px', borderRadius: 20, textTransform: 'uppercase', marginBottom: 20 }}>Coming Soon</div>
        <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(34px,9vw,58px)', lineHeight: .95, color: '#fff', margin: '0 0 16px', textTransform: 'uppercase' }}>Tennis Live Scores</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: '#aeb9c9', margin: '0 auto 32px', maxWidth: 460 }}>We're building live tennis coverage — Grand Slams, ATP &amp; WTA tours, set-by-set scores and full draws. It'll land here soon.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="font-cond" style={{ background: 'var(--gold)', color: '#1a1205', fontWeight: 800, fontSize: 15, letterSpacing: '.5px', borderRadius: 7, padding: '12px 26px', textDecoration: 'none', textTransform: 'uppercase' }}>Back to Live Scores</Link>
          <Link to="/news" className="font-cond" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#dbe3ee', fontWeight: 700, fontSize: 15, letterSpacing: '.5px', borderRadius: 7, padding: '12px 26px', textDecoration: 'none', textTransform: 'uppercase' }}>Read Tennis News</Link>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 26, justifyContent: 'center', flexWrap: 'wrap' }}>
          {TOURS.map(t => (
            <div key={t.k} style={{ textAlign: 'center' }}>
              <div className="font-cond" style={{ fontWeight: 800, fontSize: 22, color: '#fff' }}>{t.v}</div>
              <div style={{ fontSize: 11, color: 'var(--mut)', letterSpacing: '.5px', textTransform: 'uppercase', marginTop: 2 }}>{t.k}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
