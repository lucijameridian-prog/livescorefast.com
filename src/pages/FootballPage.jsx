import { useEffect, useState } from 'react'
import { getFixturesByDate } from '../api/sports'
import MatchCard from '../components/MatchCard'
import DatePicker from '../components/DatePicker'
import LeagueSidebar from '../components/LeagueSidebar'

export default function FootballPage() {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedLeague, setSelectedLeague] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getFixturesByDate(date)
      .then(setMatches)
      .catch(() => setError('Could not load fixtures. Check your API key.'))
      .finally(() => setLoading(false))
  }, [date])

  const filtered = selectedLeague
    ? matches.filter(m => m.league?.id === selectedLeague)
    : matches

  const grouped = filtered.reduce((acc, m) => {
    const key = m.league?.id
    if (!acc[key]) acc[key] = { league: m.league, matches: [] }
    acc[key].matches.push(m)
    return acc
  }, {})

  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-4">⚽ Football</h1>
      <div className="mb-4">
        <DatePicker selected={date} onChange={setDate} />
      </div>

      <div className="flex gap-4">
        <div className="hidden lg:block w-56 flex-shrink-0">
          <LeagueSidebar selected={selectedLeague} onSelect={setSelectedLeague} />
        </div>

        <div className="flex-1 min-w-0">
          {loading && <Skeleton />}
          {error && <div className="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-800/40">⚠️ {error}</div>}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <div className="text-4xl mb-3">📅</div>
              <p>No matches on {date}.</p>
            </div>
          )}

          {Object.values(grouped).map(({ league, matches: ms }) => (
            <div key={league?.id} className="mb-6">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dark-600">
                {league?.logo && <img src={league.logo} alt={league.name} className="w-5 h-5 object-contain" />}
                <span className="font-semibold text-white text-sm">{league?.name}</span>
                <span className="text-xs text-slate-500">{league?.country}</span>
                <span className="ml-auto text-xs text-slate-600">{ms.length} matches</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {ms.map(m => <MatchCard key={m.fixture?.id} match={m} />)}
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
