import { useEffect, useState } from 'react'
import { getGamesByDate } from '../api/sports'
import GenericCard from '../components/GenericCard'
import DatePicker from '../components/DatePicker'
import SportSidebar from '../components/SportSidebar'

export default function GenericSportPage({ sport, label, icon }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLeague, setSelectedLeague] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getGamesByDate(sport, date)
      .then(setGames)
      .catch(() => setError('Could not load games.'))
      .finally(() => setLoading(false))
  }, [sport, date])

  const filtered = selectedLeague
    ? games.filter(g => g.idLeague === selectedLeague || g.strLeague?.includes(selectedLeague))
    : games

  const grouped = filtered.reduce((acc, g) => {
    const key = g.idLeague || 'other'
    const name = g.strLeague || label
    if (!acc[key]) acc[key] = { name, games: [] }
    acc[key].games.push(g)
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-4">{icon} {label}</h1>
      <div className="mb-4">
        <DatePicker selected={date} onChange={setDate} />
      </div>

      <div className="flex gap-4">
        <div className="hidden lg:block w-56 flex-shrink-0">
          <SportSidebar sport={sport} selected={selectedLeague} onSelect={setSelectedLeague} />
        </div>

        <div className="flex-1 min-w-0">
          {loading && <Skeleton />}
          {error && <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-800/40">⚠️ {error}</div>}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <div className="text-4xl mb-3">{icon}</div>
              <p>No games on {date}.</p>
            </div>
          )}

          {Object.values(grouped).map(({ name, games: gs }, i) => (
            <div key={i} className="mb-6">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dark-600">
                <span className="font-semibold text-white text-sm">{name}</span>
                <span className="ml-auto text-xs text-slate-600">{gs.length} games</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {gs.map((g, j) => <GenericCard key={g.idEvent || j} game={g} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
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
