import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function PlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
      .then(res => setPlayer((res.data.players || [])[0] || null))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  )

  if (!player) return (
    <div className="text-center py-20 text-slate-500">
      <p>Player not found.</p>
      <button onClick={() => navigate(-1)} className="mt-4 text-accent text-sm hover:underline">← Go back</button>
    </div>
  )

  const age = player.dateBorn
    ? Math.floor((Date.now() - new Date(player.dateBorn)) / (365.25 * 24 * 3600 * 1000))
    : null

  const stats = [
    { label: 'Team',        value: player.strTeam },
    { label: 'Position',    value: player.strPosition },
    { label: 'Nationality', value: player.strNationality },
    { label: 'Age',         value: age ? `${age} years` : null },
    { label: 'Born',        value: player.dateBorn },
    { label: 'Height',      value: player.strHeight },
    { label: 'Weight',      value: player.strWeight },
    { label: 'Kit Number',  value: player.strNumber ? `#${player.strNumber}` : null },
    { label: 'Agent',       value: player.strAgent },
  ].filter(s => s.value)

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white text-sm mb-4 flex items-center gap-1">
        ← Back
      </button>

      <div className="bg-dark-800 rounded-xl border border-dark-600 p-6 mb-4">
        <div className="flex gap-6 items-start">
          {player.strCutout || player.strThumb ? (
            <img src={player.strCutout || player.strThumb} alt={player.strPlayer}
              className="w-28 h-28 object-cover rounded-xl flex-shrink-0 bg-dark-700"
              onError={e => e.target.style.display='none'} />
          ) : (
            <div className="w-28 h-28 rounded-xl bg-dark-600 flex items-center justify-center text-3xl text-slate-600 flex-shrink-0">
              {player.strPlayer?.[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white">{player.strPlayer}</h1>
            <p className="text-accent font-medium mt-0.5">{player.strPosition}</p>
            <p className="text-slate-400 text-sm mt-1">{player.strTeam} · {player.strNationality}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {stats.slice(0, 4).map(s => (
                <span key={s.label} className="text-xs bg-dark-600 border border-dark-500 text-slate-300 px-2 py-1 rounded-md">
                  {s.label}: {s.value}
                </span>
              ))}
            </div>
          </div>
        </div>

        {player.strDescriptionEN && (
          <div className="mt-5 pt-5 border-t border-dark-600">
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-5">{player.strDescriptionEN}</p>
          </div>
        )}
      </div>

      {/* All stats */}
      <div className="bg-dark-800 rounded-xl border border-dark-600 p-4">
        <h3 className="text-sm font-semibold text-white mb-3">Player Info</h3>
        <div className="grid grid-cols-2 gap-2">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col">
              <span className="text-xs text-slate-600">{s.label}</span>
              <span className="text-sm text-slate-300">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
