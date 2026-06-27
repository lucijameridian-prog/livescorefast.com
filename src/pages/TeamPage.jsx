import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function TeamPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [team, setTeam] = useState(null)
  const [players, setPlayers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('squad')

  useEffect(() => {
    setLoading(true)
    Promise.all([
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id=${id}`),
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookup_all_players.php?id=${id}`),
      axios.get(`https://www.thesportsdb.com/api/v1/json/3/eventslast.php?id=${id}`),
    ]).then(([teamRes, playersRes, eventsRes]) => {
      setTeam((teamRes.data.teams || [])[0] || null)
      setPlayers((playersRes.data.player || []).filter(p => p.strStatus === 'Active'))
      setEvents(eventsRes.data.results || [])
    }).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  )

  if (!team) return (
    <div className="text-center py-20 text-slate-500">
      <p>Team not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-accent text-sm hover:underline">← Go back</button>
    </div>
  )

  const positionOrder = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Attacker']
  const sorted = [...players].sort((a, b) => {
    const ai = positionOrder.findIndex(p => a.strPosition?.includes(p))
    const bi = positionOrder.findIndex(p => b.strPosition?.includes(p))
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">
        ← Back
      </button>

      {/* Header */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 mb-4">
        <div className="flex items-center gap-6">
          {team.strBadge && (
            <img src={team.strBadge} alt={team.strTeam} className="w-20 h-20 object-contain flex-shrink-0"
              onError={e => e.target.style.display='none'} />
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{team.strTeam}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {team.strLeague && <span className="text-sm text-slate-400">🏆 {team.strLeague}</span>}
              {team.strCountry && <span className="text-sm text-slate-400">🌍 {team.strCountry}</span>}
              {team.intFormedYear && <span className="text-sm text-slate-400">📅 Founded {team.intFormedYear}</span>}
              {team.strStadium && <span className="text-sm text-slate-400">🏟 {team.strStadium}</span>}
            </div>
          </div>
        </div>

        {team.strDescriptionEN && (
          <p className="mt-4 text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {team.strDescriptionEN}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-dark-800 rounded-lg p-1 border border-dark-600">
        {['squad', 'results'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-md text-sm font-medium capitalize transition-colors
              ${tab === t ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'}`}>
            {t === 'squad' ? `Squad (${players.length})` : `Last Results (${events.length})`}
          </button>
        ))}
      </div>

      {/* Squad */}
      {tab === 'squad' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
          {sorted.length === 0 ? (
            <p className="text-center py-8 text-slate-500 text-sm">No squad data available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sorted.map(p => (
                <div key={p.idPlayer} className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-700 transition-colors">
                  {p.strThumb
                    ? <img src={p.strThumb} alt={p.strPlayer} className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                        onError={e => e.target.src = ''} />
                    : <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center text-slate-600 text-xs flex-shrink-0">
                        {p.strPlayer?.[0]}
                      </div>
                  }
                  <div className="min-w-0">
                    <div className="text-sm text-white truncate">{p.strPlayer}</div>
                    <div className="text-xs text-slate-500">{p.strPosition} · {p.strNationality}</div>
                  </div>
                  {p.strNumber && <span className="ml-auto text-xs font-bold text-slate-500">#{p.strNumber}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {tab === 'results' && (
        <div className="bg-dark-800 rounded-xl border border-dark-600 divide-y divide-dark-600">
          {events.length === 0 ? (
            <p className="text-center py-8 text-slate-500 text-sm">No recent results.</p>
          ) : events.map(e => {
            const home = e.intHomeScore
            const away = e.intAwayScore
            return (
              <Link key={e.idEvent} to={`/match/${e.idEvent}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-dark-700 transition-colors">
                <div className="flex-1 text-sm text-slate-300 truncate">{e.strHomeTeam}</div>
                <div className="text-sm font-bold text-white flex-shrink-0 w-12 text-center">
                  {home ?? '-'} – {away ?? '-'}
                </div>
                <div className="flex-1 text-sm text-slate-300 truncate text-right">{e.strAwayTeam}</div>
                <div className="text-xs text-slate-600 ml-2 flex-shrink-0">{e.dateEvent}</div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
