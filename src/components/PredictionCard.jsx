import { useEffect, useState } from 'react'
import { predictMatch } from '../utils/predict'
import TeamBadge from './TeamBadge'

const PANEL_HEAD = { background: '#0a0f1a', padding: '11px 16px', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: '1px', color: 'var(--gold)', textTransform: 'uppercase', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8 }

function FormChips({ form }) {
  const col = { W: '#1FA84A', D: '#8593a8', L: '#ff3232' }
  if (!form?.length) return <span style={{ fontSize: 11, color: 'var(--mut)' }}>—</span>
  return (
    <span style={{ display: 'flex', gap: 3 }}>
      {form.map((f, i) => (
        <span key={i} style={{ width: 16, height: 16, borderRadius: 3, background: col[f], color: '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Saira Condensed',sans-serif" }}>{f}</span>
      ))}
    </span>
  )
}

export default function PredictionCard({ home, away, showTeams = true }) {
  const [pred, setPred] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setLoading(true)
    predictMatch(home, away).then(p => { if (alive) setPred(p) }).finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [home.id, away.id])

  const winner = pred && (pred.pHome >= pred.pDraw && pred.pHome >= pred.pAway ? 'home'
    : pred.pAway >= pred.pDraw ? 'away' : 'draw')

  return (
    <div className="panel">
      <div style={PANEL_HEAD}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)"><path d="M3 13h2v8H3zm4-6h2v14H7zm4-4h2v18h-2zm4 8h2v10h-2zm4-4h2v14h-2z" /></svg>
        Match Prediction
      </div>

      {loading ? (
        <div style={{ padding: 28, textAlign: 'center', color: 'var(--mut)', fontSize: 13 }}>Analysing recent form…</div>
      ) : !pred ? (
        <div style={{ padding: 24, textAlign: 'center', color: 'var(--mut)', fontSize: 13 }}>Not enough data to predict this match.</div>
      ) : (
        <div style={{ padding: '16px 16px 14px' }}>
          {showTeams && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1 }}>
                <TeamBadge name={home.name} logo={home.logo} size={22} />
                <span style={{ fontSize: 13.5, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{home.name}</span>
              </div>
              <span className="font-cond" style={{ fontWeight: 800, fontSize: 18, color: '#fff', padding: '0 12px', flexShrink: 0 }}>{pred.score}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, flex: 1, justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 13.5, color: '#dbe3ee', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{away.name}</span>
                <TeamBadge name={away.name} logo={away.logo} size={22} />
              </div>
            </div>
          )}

          {/* probability labels */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--mut)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6 }}>
            <span style={{ color: winner === 'home' ? '#fff' : 'var(--mut)' }}>1 · {pred.pHome}%</span>
            <span style={{ color: winner === 'draw' ? '#fff' : 'var(--mut)' }}>X · {pred.pDraw}%</span>
            <span style={{ color: winner === 'away' ? '#fff' : 'var(--mut)' }}>2 · {pred.pAway}%</span>
          </div>
          {/* probability bar */}
          <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2, background: 'rgba(255,255,255,.05)' }}>
            <div style={{ width: `${pred.pHome}%`, background: 'var(--accent)' }} title={`Home ${pred.pHome}%`} />
            <div style={{ width: `${pred.pDraw}%`, background: '#8593a8' }} title={`Draw ${pred.pDraw}%`} />
            <div style={{ width: `${pred.pAway}%`, background: '#3a8ad9' }} title={`Away ${pred.pAway}%`} />
          </div>

          {/* predicted score + forms */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 10 }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 10, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }}>Home form</div>
              <FormChips form={pred.formHome} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Predicted</div>
              <div className="font-cond" style={{ fontWeight: 800, fontSize: 22, color: 'var(--gold)', lineHeight: 1.1 }}>{pred.score}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'var(--mut)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 4 }}>Away form</div>
              <FormChips form={pred.formAway} />
            </div>
          </div>

          <p style={{ fontSize: 10.5, color: '#55617a', marginTop: 14, textAlign: 'center' }}>Statistical model · based on recent form. Not betting advice.</p>
        </div>
      )}
    </div>
  )
}
