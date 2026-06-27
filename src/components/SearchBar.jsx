import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TeamBadge from './TeamBadge'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({ teams: [], players: [] })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const ref = useRef(null)
  const timer = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const search = (q) => {
    setQuery(q)
    clearTimeout(timer.current)
    if (q.trim().length < 2) { setResults({ teams: [], players: [] }); setOpen(false); return }
    timer.current = setTimeout(async () => {
      setLoading(true)
      try {
        const [teamsRes, playersRes] = await Promise.all([
          axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(q)}`),
          axios.get(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(q)}`),
        ])
        setResults({
          teams: (teamsRes.data.teams || []).slice(0, 5),
          players: (playersRes.data.player || []).slice(0, 5),
        })
        setOpen(true)
      } catch {
        setResults({ teams: [], players: [] })
      } finally {
        setLoading(false)
      }
    }, 350)
  }

  const go = (path) => { setOpen(false); setQuery(''); navigate(path) }
  const hasResults = results.teams.length > 0 || results.players.length > 0

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,.28)', border: '1px solid rgba(255,255,255,.18)', borderRadius: 6, padding: '0 12px', height: 38, width: 240, gap: 9 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
        <input
          value={query}
          onChange={e => search(e.target.value)}
          onFocus={() => hasResults && setOpen(true)}
          placeholder="Search teams, players..."
          style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'Saira', fontSize: 13.5, width: '100%' }}
        />
        {loading && <div style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,.5)', borderTopColor: 'transparent', borderRadius: '50%', flexShrink: 0, animation: 'spin 0.7s linear infinite' }} />}
      </div>

      {open && hasResults && (
        <div className="panel" style={{ position: 'absolute', right: 0, top: '100%', marginTop: 6, width: 300, zIndex: 50, boxShadow: '0 12px 32px rgba(0,0,0,.5)' }}>
          {results.teams.length > 0 && (
            <div>
              <div style={{ padding: '7px 14px', fontSize: 10.5, color: 'var(--mut)', fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', borderBottom: '1px solid var(--line)' }}>Teams</div>
              {results.teams.map(team => (
                <button key={team.idTeam} onClick={() => go(`/team/${team.idTeam}`)} className="row-hover"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '9px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <TeamBadge name={team.strTeam} logo={team.strBadge ? team.strBadge + '/tiny' : null} size={28} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: '#dbe3ee' }}>{team.strTeam}</div>
                    <div style={{ fontSize: 11, color: 'var(--mut)' }}>{team.strLeague} · {team.strCountry}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {results.players.length > 0 && (
            <div>
              <div style={{ padding: '7px 14px', fontSize: 10.5, color: 'var(--mut)', fontWeight: 700, letterSpacing: '.5px', textTransform: 'uppercase', borderBottom: '1px solid var(--line)', borderTop: '1px solid var(--line)' }}>Players</div>
              {results.players.map(p => (
                <button key={p.idPlayer} onClick={() => go(`/player/${p.idPlayer}`)} className="row-hover"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '9px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  {p.strThumb
                    ? <img src={p.strThumb} alt={p.strPlayer} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} onError={e => { e.target.style.display = 'none' }} />
                    : <TeamBadge name={p.strPlayer} size={28} />}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: '#dbe3ee' }}>{p.strPlayer}</div>
                    <div style={{ fontSize: 11, color: 'var(--mut)' }}>{p.strTeam} · {p.strPosition}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
