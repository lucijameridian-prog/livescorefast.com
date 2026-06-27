import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const KEY = 'lsf-cookie-consent'
const GA_ID = 'G-0X7WD70ZB1'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const choice = localStorage.getItem(KEY)
    if (!choice) setShow(true)
    if (choice === 'declined') window[`ga-disable-${GA_ID}`] = true
  }, [])

  const decide = (val) => {
    localStorage.setItem(KEY, val)
    if (val === 'declined') window[`ga-disable-${GA_ID}`] = true
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{ position: 'fixed', left: 12, right: 12, bottom: 12, zIndex: 120, display: 'flex', justifyContent: 'center' }}>
      <div className="panel" style={{ maxWidth: 720, width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', boxShadow: '0 12px 32px rgba(0,0,0,.5)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, color: '#cfd8e4', lineHeight: 1.5, flex: 1, minWidth: 200 }}>
          🍪 We use cookies for analytics to improve the site. See our <Link to="/privacy" style={{ color: 'var(--gold)' }}>Privacy Policy</Link>.
        </span>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={() => decide('declined')} className="font-cond"
            style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#cfd8e4', fontWeight: 700, fontSize: 13, letterSpacing: '.5px', padding: '8px 16px', borderRadius: 7, cursor: 'pointer', textTransform: 'uppercase' }}>Decline</button>
          <button onClick={() => decide('accepted')} className="font-cond"
            style={{ background: 'var(--gold)', border: 'none', color: '#1a1205', fontWeight: 800, fontSize: 13, letterSpacing: '.5px', padding: '8px 18px', borderRadius: 7, cursor: 'pointer', textTransform: 'uppercase' }}>Accept</button>
        </div>
      </div>
    </div>
  )
}
