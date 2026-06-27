import { useEffect, useState } from 'react'
import { getFixturesByDate } from '../api/sports'
import MatchCard from '../components/MatchCard'
import DatePicker from '../components/DatePicker'

export default function FootballPage() {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getFixturesByDate(date)
      .then(setMatches)
      .catch(() => setError('Could not load fixtures.'))
      .finally(() => setLoading(false))
  }, [date])

  const grouped = (matches || []).reduce((acc, m) => {
    const key = m.idLeague || 'other'
    const name = m.strLeague || 'Other'
    if (!acc[key]) acc[key] = { name, games: [] }
    acc[key].games.push(m)
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-4">⚽ Football</h1>
      <div className="mb-4">
        <DatePicker selected={date} onChange={setDate} />
      </div>

      {loading && <Skeleton />}
      {error && <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-800/40">⚠️ {error}</div>}

      {!loading && !error && matches.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <div className="text-4xl mb-3">📅</div>
          <p>No matches on {date}.</p>
        </div>
      )}

      {Object.values(grouped).map(({ name, games }, i) => (
        <div key={i} className="mb-6">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dark-600">
            <span className="font-semibold text-white text-sm">{name}</span>
            <span className="ml-auto text-xs text-slate-600">{games.length} matches</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {games.map((m, j) => <MatchCard key={m.idEvent || j} match={m} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

function Skeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-dark-800 rounded-lg p-4 border border-dark-600 animate-pulse">
          <div className="h-3 bg-dark-600 rounded w-1/3 mb-4" />
          <div className="h-5 bg-dark-600 rounded w-2/3 mb-2" />
          <div className="h-5 bg-dark-600 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}
