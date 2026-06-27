import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2 bg-dark-700 border border-dark-600 rounded-lg px-3 py-1.5 w-48 focus-within:border-accent transition-colors">
        <svg className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={query}
          onChange={e => search(e.target.value)}
          onFocus={() => hasResults && setOpen(true)}
          placeholder="Search teams, players..."
          className="bg-transparent text-slate-300 text-xs placeholder-slate-600 outline-none w-full"
        />
        {loading && <div className="w-3 h-3 border border-accent border-t-transparent rounded-full animate-spin flex-shrink-0" />}
      </div>

      {open && hasResults && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-dark-800 border border-dark-600 rounded-lg shadow-xl z-50 overflow-hidden">
          {results.teams.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs text-slate-600 font-semibold uppercase tracking-wider border-b border-dark-700">Teams</div>
              {results.teams.map(team => (
                <button key={team.idTeam} onClick={() => go(`/team/${team.idTeam}`)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-dark-700 transition-colors text-left">
                  {team.strBadge
                    ? <img src={team.strBadge + '/tiny'} alt={team.strTeam} className="w-7 h-7 object-contain flex-shrink-0" onError={e => e.target.style.display='none'} />
                    : <div className="w-7 h-7 bg-dark-600 rounded flex-shrink-0" />
                  }
                  <div>
                    <div className="text-sm text-white">{team.strTeam}</div>
                    <div className="text-xs text-slate-500">{team.strLeague} · {team.strCountry}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {results.players.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-xs text-slate-600 font-semibold uppercase tracking-wider border-b border-dark-700">Players</div>
              {results.players.map(p => (
                <button key={p.idPlayer} onClick={() => go(`/player/${p.idPlayer}`)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-dark-700 transition-colors text-left">
                  {p.strThumb
                    ? <img src={p.strThumb} alt={p.strPlayer} className="w-7 h-7 object-cover rounded-full flex-shrink-0" onError={e => e.target.style.display='none'} />
                    : <div className="w-7 h-7 bg-dark-600 rounded-full flex-shrink-0" />
                  }
                  <div>
                    <div className="text-sm text-white">{p.strPlayer}</div>
                    <div className="text-xs text-slate-500">{p.strTeam} · {p.strPosition}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!hasResults && !loading && query.length >= 2 && (
            <div className="px-3 py-4 text-xs text-slate-600 text-center">No results for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
