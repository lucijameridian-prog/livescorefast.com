import { useState, useEffect } from 'react'

export default function GetAppButton({ compact }) {
  const [open, setOpen] = useState(false)
  const [installEvt, setInstallEvt] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setInstallEvt(e) }
    const onInstalled = () => { setInstalled(true); setInstallEvt(null) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled) }
  }, [])

  const androidInstall = async () => {
    if (!installEvt) return
    installEvt.prompt()
    await installEvt.userChoice
    setInstallEvt(null)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="font-cond"
        style={{ background: 'var(--gold)', color: '#1a1205', fontWeight: 800, fontSize: 14, letterSpacing: '.5px', border: 'none', borderRadius: 6, height: 38, padding: compact ? '0 12px' : '0 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, whiteSpace: 'nowrap' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a1205"><path d="M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 21a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM17 18H7V4h10z" /></svg>
        {compact ? 'APP' : 'GET THE APP'}
      </button>

      {open && (
        <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} className="panel" style={{ maxWidth: 640, width: '100%', borderRadius: 14 }}>
            <div style={{ padding: '22px 24px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 3 L28 27 L20.5 27 L16 16 L11.5 27 L4 27 Z" fill="var(--accent)" /><path d="M16 11 L20.5 21 L11.5 21 Z" fill="var(--gold)" /></svg>
              <div>
                <h2 className="font-cond" style={{ fontWeight: 800, fontSize: 22, color: '#fff', margin: 0, textTransform: 'uppercase', lineHeight: 1 }}>Get the App</h2>
                <p style={{ fontSize: 12.5, color: 'var(--mut)', margin: '4px 0 0' }}>Live scores on your home screen — iPhone &amp; Android</p>
              </div>
              <div style={{ flex: 1 }} />
              <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#cfd8e4', width: 32, height: 32, borderRadius: 7, cursor: 'pointer', fontSize: 16, flexShrink: 0 }}>✕</button>
            </div>

            <div style={{ padding: 22, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
              {/* iOS */}
              <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 18, background: 'rgba(255,255,255,.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <span className="font-cond" style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>iPhone &amp; iPad</span>
                </div>
                <ol style={{ margin: '0 0 16px', paddingLeft: 18, color: '#aeb9c9', fontSize: 13, lineHeight: 1.7 }}>
                  <li>Open livescorefast.com in <b style={{ color: '#dbe3ee' }}>Safari</b></li>
                  <li>Tap the <b style={{ color: '#dbe3ee' }}>Share</b> button</li>
                  <li>Choose <b style={{ color: '#dbe3ee' }}>Add to Home Screen</b></li>
                </ol>
                <div style={storeBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#9fabbd"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                  <span><small style={{ display: 'block', fontSize: 9, color: 'var(--mut)' }}>Coming soon to</small>App Store</span>
                  <span style={soonPill}>SOON</span>
                </div>
              </div>

              {/* Android */}
              <div style={{ border: '1px solid var(--line)', borderRadius: 12, padding: 18, background: 'rgba(255,255,255,.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#3ddc84"><path d="M17.6 9.48l1.84-3.18a.4.4 0 0 0-.7-.4l-1.86 3.23a11.4 11.4 0 0 0-8.76 0L6.27 5.9a.4.4 0 1 0-.7.4L7.4 9.48A10.8 10.8 0 0 0 2 18h20a10.8 10.8 0 0 0-5.4-8.52M7 15.25a1 1 0 1 1 0-2 1 1 0 0 1 0 2m10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2" /></svg>
                  <span className="font-cond" style={{ fontWeight: 700, fontSize: 17, color: '#fff' }}>Android</span>
                </div>
                {installed ? (
                  <p style={{ color: 'var(--green)', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>✓ App installed — open it from your home screen.</p>
                ) : installEvt ? (
                  <>
                    <p style={{ color: '#aeb9c9', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>Install the LiveScoreFast app directly:</p>
                    <button onClick={androidInstall} className="font-cond" style={{ width: '100%', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 0', fontWeight: 800, fontSize: 15, letterSpacing: '.5px', cursor: 'pointer', marginBottom: 16 }}>INSTALL APP</button>
                  </>
                ) : (
                  <ol style={{ margin: '0 0 16px', paddingLeft: 18, color: '#aeb9c9', fontSize: 13, lineHeight: 1.7 }}>
                    <li>Open livescorefast.com in <b style={{ color: '#dbe3ee' }}>Chrome</b></li>
                    <li>Tap the <b style={{ color: '#dbe3ee' }}>⋮</b> menu</li>
                    <li>Choose <b style={{ color: '#dbe3ee' }}>Install app</b></li>
                  </ol>
                )}
                <div style={storeBadge}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#9fabbd"><path d="M3 20.5V3.5c0-.6.3-1.1.8-1.3l11.6 9.8L3.8 21.8c-.5-.2-.8-.7-.8-1.3M16.8 13.2l2.7 2.3-3.2 1.8-2.4-2 2.9-2.1m-2.9-1.9L4.6 3.4 16 9.9l-2.1 1.4M17 9.4l3.8 2.2c.7.4.7 1.4 0 1.8L17 15.6l-2.5-2.1L17 9.4z" /></svg>
                  <span><small style={{ display: 'block', fontSize: 9, color: 'var(--mut)' }}>Coming soon to</small>Google Play</span>
                  <span style={soonPill}>SOON</span>
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: 11.5, color: '#55617a', padding: '0 0 18px', margin: 0 }}>Free · No account needed · Works offline</p>
          </div>
        </div>
      )}
    </>
  )
}

const storeBadge = { display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)', borderRadius: 8, padding: '8px 12px', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: '#cfd8e4' }
const soonPill = { marginLeft: 'auto', fontSize: 9, fontWeight: 700, letterSpacing: '.5px', color: 'var(--gold)', background: 'rgba(246,201,21,.12)', border: '1px solid rgba(246,201,21,.3)', borderRadius: 4, padding: '2px 6px' }
