import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { teamColor, abbr } from '../utils/team'

const PANEL_HEAD = { background: '#0a0f1a', padding: '10px 16px', fontFamily: "'Saira Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '1px', color: 'var(--gold)', textTransform: 'uppercase', borderBottom: '1px solid var(--line)' }

export default function PlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
      .then(res => setPlayer((res.data.players || [])[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}><div style={{ width: 32, height: 32, border: '3px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .8s linear infinite' }} /></div>
  if (!player) return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--mut)' }}><p>Player not found.</p><button onClick={() => navigate(-1)} style={{ marginTop: 16, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}>← Go back</button></div>

  const color = teamColor(player.strPlayer || '')
  const age = player.dateBorn ? Math.floor((Date.now() - new Date(player.dateBorn)) / (365.25 * 24 * 3600 * 1000)) : null
  const img = player.strCutout || player.strThumb

  const info = [
    ['Full name', player.strPlayer], ['Date of birth', player.dateBorn], ['Nationality', player.strNationality],
    ['Height', player.strHeight], ['Weight', player.strWeight], ['Position', player.strPosition], ['Shirt number', player.strNumber],
  ].filter(r => r[1])

  const heroStats = [
    player.strNumber && ['Number', `#${player.strNumber}`],
    age && ['Age', age],
    player.strNationality && ['Nation', player.strNationality],
  ].filter(Boolean)

  return (
    <div>
      {/* HERO */}
      <div style={{ background: `radial-gradient(130% 170% at 80% -40%,${color} 0%,#0d1320 55%,#090d16 100%)`, borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 18px', display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 120, height: 120, borderRadius: 18, background: `linear-gradient(160deg,${color},#0e1320)`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,.5)' }}>
              {img ? <img src={img} alt={player.strPlayer} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none' }} />
                : <span className="font-cond" style={{ fontWeight: 800, fontSize: 46, color: 'rgba(255,255,255,.92)', marginBottom: 6 }}>{abbr(player.strPlayer)}</span>}
            </div>
            {player.strNumber && <span className="font-cond" style={{ position: 'absolute', top: -12, right: -12, width: 44, height: 44, borderRadius: 12, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, color: '#1a1205', boxShadow: '0 6px 16px rgba(0,0,0,.4)' }}>{player.strNumber}</span>}
          </div>
          <div style={{ minWidth: 0 }}>
            {player.strTeam && <Link to="/football" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--gold)', fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 6 }}><span style={{ width: 16, height: 16, borderRadius: '50%', background: teamColor(player.strTeam), display: 'inline-block' }} />{player.strTeam}</Link>}
            <h1 className="font-cond" style={{ fontWeight: 800, fontSize: 'clamp(28px,7vw,44px)', lineHeight: .95, color: '#fff', margin: 0 }}>{player.strPlayer}</h1>
            <div style={{ display: 'flex', gap: 9, marginTop: 12, flexWrap: 'wrap' }}>
              {player.strPosition && <span className="font-cond" style={{ background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: 13, padding: '4px 13px', borderRadius: 6, textTransform: 'uppercase' }}>{player.strPosition}</span>}
              {player.strNationality && <span style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#cfd8e4', fontSize: 13, padding: '4px 13px', borderRadius: 6 }}>{player.strNationality}</span>}
              {age && <span style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--line)', color: '#cfd8e4', fontSize: 13, padding: '4px 13px', borderRadius: 6 }}>Age {age}</span>}
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            {heroStats.map(([k, v]) => (
              <div key={k} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)', borderRadius: 10, padding: '14px 20px', textAlign: 'center', minWidth: 78 }}>
                <div className="font-cond" style={{ fontWeight: 800, fontSize: 26, color: 'var(--gold)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10.5, color: 'var(--mut)', letterSpacing: '.5px', textTransform: 'uppercase', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1180, margin: '16px auto', padding: '0 18px 30px', display: 'grid', gridTemplateColumns: '300px minmax(0,1fr)', gap: 16, alignItems: 'start' }} className="player-grid">
        <aside>
          <div className="panel">
            <div style={PANEL_HEAD}>Personal Info</div>
            {info.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderBottom: '1px solid rgba(255,255,255,.04)', fontSize: 13.5 }}>
                <span style={{ color: 'var(--mut)' }}>{k}</span><span style={{ color: '#dbe3ee', fontWeight: 600, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </div>
        </aside>
        <main style={{ minWidth: 0 }}>
          {player.strDescriptionEN && (
            <div className="panel">
              <div style={PANEL_HEAD}>Biography</div>
              <p style={{ padding: 18, fontSize: 14, lineHeight: 1.65, color: '#aeb9c9', margin: 0 }}>{player.strDescriptionEN}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
