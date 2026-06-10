import { useEffect, useState } from 'react'
import { getGamesByDate } from '../api/sports'
import GenericCard from '../components/GenericCard'
import DatePicker from '../components/DatePicker'

export default function GenericSportPage({ sport, label, icon }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getGamesByDate(sport, date)
      .then(setGames)
      .catch(() => setError('Could not load games. Check your API key.'))
      .finally(() => setLoading(false))
  }, [sport, date])

  const grouped = games.reduce((acc, g) => {
    const key = g.league?.id || g.competition?.id || g.event?.id || 'other'
    const name = g.league?.name || g.competition?.name || g.event?.name || label
    const logo = g.league?.logo || null
    if (!acc[key]) acc[key] = { name, logo, games: [] }
    acc[key].games.push(g)
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-4">{icon} {label}</h1>
      <div className="mb-4">
        <DatePicker selected={date} onChange={setDate} />
      </div>

      {loading && <Skeleton />}
      {error && (
        <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-800/40">⚠️ {error}</div>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <div className="text-4xl mb-3">{icon}</div>
          <p>No games on {date}.</p>
        </div>
      )}

      {Object.values(grouped).map(({ name, logo, games: gs }, i) => (
        <div key={i} className="mb-6">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dark-600">
            {logo && <img src={logo} alt={name} className="w-5 h-5 object-contain" />}
            <span className="font-semibold text-white text-sm">{name}</span>
            <span className="ml-auto text-xs text-slate-600">{gs.length} games</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {gs.map((g, j) => <GenericCard key={g.id || j} game={g} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-dark-800 rounded-lg p-4 border border-dark-600 animate-pulse">
          <div className="h-3 bg-dark-600 rounded w-1/3 mb-4" />
          <div className="h-5 bg-dark-600 rounded w-2/3 mb-2" />
          <div className="h-5 bg-dark-600 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}
