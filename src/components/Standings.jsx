import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LEAGUES = [
  { id: '4328', name: 'Premier League',   season: '2024-2025', topScorers: [{ name: 'Mohamed Salah', team: 'Liverpool', goals: 29, id: '34145506' }, { name: 'Alexander Isak', team: 'Newcastle', goals: 25, id: '34145558' }, { name: 'Erling Haaland', team: 'Man City', goals: 22, id: '34145527' }, { name: 'Cole Palmer', team: 'Chelsea', goals: 20, id: '34157883' }, { name: 'Matheus Cunha', team: 'Wolves', goals: 16, id: '34156065' }] },
  { id: '4335', name: 'La Liga',          season: '2024-2025', topScorers: [{ name: 'Kylian Mbappé', team: 'Real Madrid', goals: 31, id: '34147178' }, { name: 'Robert Lewandowski', team: 'Barcelona', goals: 27, id: '34145831' }, { name: 'Antoine Griezmann', team: 'Atletico', goals: 14, id: '34146024' }, { name: 'Raphinha', team: 'Barcelona', goals: 14, id: '34156075' }, { name: 'Vinicius Jr', team: 'Real Madrid', goals: 13, id: '34157014' }] },
  { id: '4332', name: 'Serie A',          season: '2024-2025', topScorers: [{ name: 'Mateo Retegui', team: 'Atalanta', goals: 25, id: '34157892' }, { name: 'Romelu Lukaku', team: 'Napoli', goals: 13, id: '34147055' }, { name: 'Marcus Thuram', team: 'Inter', goals: 13, id: '34157893' }] },
  { id: '4331', name: 'Bundesliga',       season: '2024-2025', topScorers: [{ name: 'Harry Kane', team: 'Bayern', goals: 25, id: '34145549' }, { name: 'Serhou Guirassy', team: 'Dortmund', goals: 14, id: '34157894' }, { name: 'Omar Marmoush', team: 'Frankfurt', goals: 15, id: '34157895' }] },
  { id: '4334', name: 'Ligue 1',          season: '2024-2025', topScorers: [{ name: 'Jonathan David', team: 'Lille', goals: 20, id: '34157896' }, { name: 'Bradley Barcola', team: 'PSG', goals: 17, id: '34157897' }] },
  { id: '4480', name: 'Champions League', season: '2024-2025', topScorers: [{ name: 'Robert Lewandowski', team: 'Barcelona', goals: 9, id: '34145831' }, { name: 'Harry Kane', team: 'Bayern', goals: 8, id: '34145549' }, { name: 'Erling Haaland', team: 'Man City', goals: 7, id: '34145527' }] },
  { id: '4607', name: 'World Cup 2026',   season: '2026', topScorers: [] },
]

export default function Standings() {
  const [selected, setSelected] = useState(LEAGUES[0])
  const [table, setTable] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('table')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios.get(`https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${selected.id}&s=${selected.season}`)
      .then(res => setTable(res.data.table || []))
      .catch(() => setTable([]))
      .finally(() => setLoading(false))
  }, [selected])

  const groups = table.reduce((acc, row) => {
    const key = row.strGroup || 'Overall'
    if (!acc[key]) acc[key] = []
    acc[key].push(row)
    return acc
  }, {})

  return (
    <aside className="bg-dark-800 rounded-lg border border-dark-600 p-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Stats</h3>

      <select
        value={selected.id}
        onChange={e => setSelected(LEAGUES.find(l => l.id === e.target.value))}
        className="w-full bg-dark-700 border border-dark-600 text-slate-300 text-xs rounded-md px-2 py-1.5 mb-3 focus:outline-none focus:border-accent"
      >
        {LEAGUES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
      </select>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 bg-dark-700 rounded-md p-0.5">
        <button onClick={() => setTab('table')}
          className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${tab === 'table' ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'}`}>
          Table
        </button>
        <button onClick={() => setTab('scorers')}
          className={`flex-1 py-1 rounded text-xs font-medium transition-colors ${tab === 'scorers' ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'}`}>
          Top Scorers
        </button>
      </div>

      {/* Table Tab */}
      {tab === 'table' && (
        <>
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
                    <tr key={i} className="border-b border-dark-700 hover:bg-dark-700 transition-colors cursor-pointer"
                        onClick={() => row.idTeam && navigate(`/team/${row.idTeam}`)}>
                      <td className="py-1.5 text-slate-500">{row.intRank}</td>
                      <td className="py-1.5">
                        <div className="flex items-center gap-1.5">
                          {(row.strBadge || row.strTeamBadge) && (
                            <img src={row.strBadge || row.strTeamBadge} alt={row.strTeam} className="w-4 h-4 object-contain" onError={e => e.target.style.display='none'} />
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
        </>
      )}

      {/* Top Scorers Tab */}
      {tab === 'scorers' && (
        <div>
          {selected.topScorers.length === 0 ? (
            <p className="text-xs text-slate-600 text-center py-4">No scorer data available.</p>
          ) : (
            <div className="space-y-1">
              {selected.topScorers.map((s, i) => (
                <button key={i} onClick={() => navigate(`/player/${s.id}`)}
                  className="w-full flex items-center gap-2 py-2 px-1 hover:bg-dark-700 rounded transition-colors text-left">
                  <span className="text-xs text-slate-600 w-4 text-center">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white truncate">{s.name}</div>
                    <div className="text-xs text-slate-600 truncate">{s.team}</div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-sm font-bold text-white">{s.goals}</span>
                    <span className="text-xs text-slate-600">⚽</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <p className="text-xs text-slate-700 mt-3 text-center">Season 2024/25 final stats</p>
        </div>
      )}
    </aside>
  )
}
