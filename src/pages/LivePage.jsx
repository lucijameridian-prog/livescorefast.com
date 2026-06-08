import { useEffect, useState } from 'react'
import { getLiveMatches } from '../api/sports'
import MatchCard from '../components/MatchCard'

export default function LivePage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = async () => {
    try {
      const data = await getLiveMatches()
      setMatches(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (e) {
      setError('Could not load live matches. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
          <h1 className="text-xl font-bold text-white">Live Matches</h1>
          {matches.length > 0 && (
            <span className="bg-red-600/20 text-red-400 text-xs px-2 py-0.5 rounded-full border border-red-800/40">
              {matches.length} live
            </span>
          )}
        </div>
        {lastUpdated && (
          <span className="text-xs text-slate-600">
            Updated {lastUpdated.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorBox msg={error} />}

      {!loading && !error && matches.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <div className="text-4xl mb-3">⚽</div>
          <p>No live matches right now.</p>
          <p className="text-sm mt-1">Check back later or browse by date.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {matches.map(m => (
          <MatchCard key={m.fixture?.id} match={m} />
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
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

function ErrorBox({ msg }) {
  return (
    <div className="bg-red-900/20 border border-red-800/40 rounded-lg p-4 text-red-400 text-sm mb-4">
      ⚠️ {msg}
    </div>
  )
}
