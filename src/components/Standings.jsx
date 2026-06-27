import { useEffect, useState } from 'react'
import axios from 'axios'

const LEAGUES = [
  { id: '4607', name: 'World Cup 2026', season: '2026' },
  { id: '4328', name: 'Premier League', season: '2024-2025' },
  { id: '4335', name: 'La Liga',        season: '2024-2025' },
  { id: '4332', name: 'Serie A',        season: '2024-2025' },
  { id: '4331', name: 'Bundesliga',     season: '2024-2025' },
  { id: '4334', name: 'Ligue 1',        season: '2024-2025' },
]

export default function Standings() {
  const [selected, setSelected] = useState(LEAGUES[0])
  const [table, setTable] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${selected.id}&s=${selected.season}`)
      .then(res => setTable(res.data.table || []))
      .catch(() => setTable([]))
      .finally(() => setLoading(false))
  }, [selected])

  // Group by group name if exists (World Cup groups)
  const groups = table.reduce((acc, row) => {
    const key = row.strGroup || 'Overall'
    if (!acc[key]) acc[key] = []
    acc[key].push(row)
    return acc
  }, {})

  return (
    <aside className="bg-dark-800 rounded-lg border border-dark-600 p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Standings</h3>

      {/* League selector */}
      <select
        value={selected.id}
        onChange={e => setSelected(LEAGUES.find(l => l.id === e.target.value))}
        className="w-full bg-dark-700 border border-dark-600 text-slate-300 text-xs rounded-md px-2 py-1.5 mb-3 focus:outline-none focus:border-accent"
      >
        {LEAGUES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
      </select>

      {loading && (
        <div className="space-y-2">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="h-4 bg-dark-600 rounded animate-pulse" />
          ))}
        </div>
      )}

      {!loading && table.length === 0 && (
        <p className="text-xs text-slate-600 text-center py-4">No standings available.</p>
      )}

      {!loading && Object.entries(groups).map(([groupName, rows]) => (
        <div key={groupName} className="mb-4">
          {groupName !== 'Overall' && (
            <div className="text-xs font-semibold text-accent mb-1">{groupName}</div>
          )}
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-600 border-b border-dark-600">
                <th className="text-left py-1 w-5">#</th>
                <th className="text-left py-1">Team</th>
                <th className="text-center py-1 w-5">P</th>
                <th className="text-center py-1 w-5">W</th>
                <th className="text-center py-1 w-5">D</th>
                <th className="text-center py-1 w-5">L</th>
                <th className="text-center py-1 w-8">GD</th>
                <th className="text-center py-1 w-6 font-bold text-slate-400">Pts</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-dark-700 hover:bg-dark-700 transition-colors">
                  <td className="py-1.5 text-slate-500">{row.intRank}</td>
                  <td className="py-1.5">
                    <div className="flex items-center gap-1.5">
                      {row.strTeamBadge && (
                        <img src={row.strTeamBadge} alt={row.strTeam} className="w-4 h-4 object-contain" onError={e => e.target.style.display='none'} />
                      )}
                      <span className="text-slate-300 truncate max-w-[80px]">{row.strTeam}</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center text-slate-400">{row.intPlayed}</td>
                  <td className="py-1.5 text-center text-slate-400">{row.intWin}</td>
                  <td className="py-1.5 text-center text-slate-400">{row.intDraw}</td>
                  <td className="py-1.5 text-center text-slate-400">{row.intLoss}</td>
                  <td className="py-1.5 text-center text-slate-400">
                    {row.intGoalDifference > 0 ? `+${row.intGoalDifference}` : row.intGoalDifference}
                  </td>
                  <td className="py-1.5 text-center font-bold text-white">{row.intPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </aside>
  )
}
